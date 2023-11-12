import requests, json, math
from flask import Flask, jsonify
import xml.etree.ElementTree as ET 

app = Flask(__name__)

app_id = "y93c10tjpj"
hash_token =  "eTkzYzEwdGpwanx1am9DUmJvMzRsNHZOVU1Db0N1U1M3MlNRbGZpdmprSzFQVkhSdm5U"
auth = requests.get('https://api.iq.inrix.com/auth/v1/appToken?appId=' + app_id + '&hashToken=' + hash_token)
json_data = auth.json()
api_key = json_data['result']['token']

header = {'Authorization' : 'Bearer ' + api_key}

# maximum of 8 points, most accurate when 6 points
@app.route("/getRoutes/ <start_long> <start_lat> <time> <highway> <points>")
def getRoutes(start_long, start_lat, time, highway, points):
    add_highway = ""
    if not highway:
        add_highway = "&criteria=H"
    polygon_url = 'https://api.iq.inrix.com/drivetimePolygons?center=' + str(start_long) + "%7C" + str(start_lat) + '&duration=' + str(time//points)
    polygon = requests.get(polygon_url, headers = header)
    polygon_tree = ET.fromstring(polygon.text)
    coords = polygon_tree[0][0][0][0][0][0].text
    
    loc_long = [start_long]
    loc_lat = [start_lat]
    
    midpoints = ""
    j = 0
    even = 0
    for i in range(points):
        temp = math.floor(i*(100/points))
        if temp % 2 != 0:
            even = 1
        else:
            even = 0
        loc_long.append(coords.split(' ')[temp+even])
        loc_lat.append(coords.split(' ')[temp+1+even])
        midpoints += '&wp_' + str(i+2) + '=' + str(loc_long[i+1]) + "%2C" + str(loc_lat[i+1]) 
        j += 1
    route_url = 'https://api.iq.inrix.com/findRoute?wp_1=' + str(loc_long[0]) + "%2C" + str(loc_lat[0]) + midpoints +'&wp_'+ str(points + 2) + '=' + str(loc_long[0]) + "%2C" + str(loc_lat[0])  + '&maxAlternates=2&format=json' + add_highway
    route = requests.get(route_url, headers = header)
    routing = route.json()
    route_list = []

    item = routing['result']['trip']['routes'][0]['id']
    route_list.append(item);
    route_list.append(str(int(item)+1));
    route_list.append(str(int(item)+2));
    return route_list
    
@app.route("/getRouteInfo/ <route_id>")
def getRouteInfo(route_id):
    route_url = 'https://api.iq.inrix.com/route?routeId=' + route_id + '&format=json'
    route_info = requests.get(route_url, headers = header)
    route = route_info.json()
    route_waypoints = []
    length = len(route['result']['trip']['wayPoints'])
    for i in range(length):
        route_waypoints.append(route['result']['trip']['wayPoints'][i]['geometry']['coordinates'])
    return route_waypoints

app.run()
   
   
    
    
    
    