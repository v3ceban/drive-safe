#imports for API calls, math, flask, and parsing through xml files
import requests, json, math
from flask import Flask, jsonify, request
import xml.etree.ElementTree as ET 

app = Flask(__name__)

#Creates api key by calling the Inrix appToken API, does this every time the code is run to ensure the key isnt expired
app_id = "y93c10tjpj"
hash_token =  "eTkzYzEwdGpwanx1am9DUmJvMzRsNHZOVU1Db0N1U1M3MlNRbGZpdmprSzFQVkhSdm5U"
auth = requests.get('https://api.iq.inrix.com/auth/v1/appToken?appId=' + app_id + '&hashToken=' + hash_token)
json_data = auth.json()
api_key = json_data['result']['token']

#Format for authorization Inrix uses
header = {'Authorization' : 'Bearer ' + api_key}

#Sets up function and API for getRoutes, which returns a json of a list
#example call http://127.0.0.1:5000/getRoutes?start_long=33.174639232&start_lat=-122.4356485&highway=True&time=30&points=6
@app.route("/getRoutes")
def getRoutes():
    #takes input from arguments included in the url, assigns them to variables
    start_long = request.args.get("start_long", type=float)
    start_lat = request.args.get("start_lat", type=float)
    highway = request.args.get("highway", type = bool)
    time = request.args.get('time', type = int)
    
    # maximum of 8 points, most accurate when 6 points
    points = request.args.get('points', type = int)

    #adds a no highway parameter depending on user input arguements
    if not highway:
        add_highway = "&criteria=H"

    #Creates the url for drivetimePolygons, using starting longitude, "%7C" which is a '|', starting latitude, and a duration calculated from time and number of points
    polygon_url = 'https://api.iq.inrix.com/drivetimePolygons?center=' + str(start_long) + "%7C" + str(start_lat) + '&duration=' + str(int(time)//int(points))
    
    #Calls thhe drivetimePolygons API, which returns an XML file (no option for JSON)
    polygon = requests.get(polygon_url, headers = header)
    
    #Changes the XML file into a parsable format
    polygon_tree = ET.fromstring(polygon.text)
    #Locations in the XML of coordinates, a String containing thhe longitude and latitude of each point of the drivetimePolygon
    coords = polygon_tree[0][0][0][0][0][0].text

    #Creates a list for longitude and latitude
    loc_long = [start_long]
    loc_lat = [start_lat]

    #Creates a string comprised of smaller strings to add to the route url
    midpoints = ""
    even = 0
    for i in range(points):
        #variable for location of the coordinates we are using
        temp = math.floor(i*(100/points))

        #makes sure that the first number is even: longitude
        if temp % 2 != 0:
            even = 1
        else:
            even = 0

        #adds the coordinates to the longitude and latitude lists after seperating each coordinate in the string, thhen adds it to the midpoints string
        loc_long.append(coords.split(' ')[temp+even])
        loc_lat.append(coords.split(' ')[temp+1+even])
        midpoints += '&wp_' + str(i+2) + '=' + str(loc_long[i+1]) + "%2C" + str(loc_lat[i+1]) 

    #sets the url to be used
    route_url = 'https://api.iq.inrix.com/findRoute?wp_1=' + str(loc_long[0]) + "%2C" + str(loc_lat[0]) + midpoints +'&wp_'+ str(points + 2) + '=' + str(loc_long[0]) + "%2C" + str(loc_lat[0])  + '&maxAlternates=2&format=json' + add_highway
    
    #calls the findRoute API, and changes the response into a json
    route = requests.get(route_url, headers = header)
    routing = route.json()

    '''Creates list of routes'''
    route_list = []
    
    #Determines the location of the route ID in the json, then adds them to the string (the first route ID is found easily, the next two routes are +1 and +2 from that value
    item = routing['result']['trip']['routes'][0]['id']
    route_list.append(item)
    route_list.append(str(int(item)+1))
    route_list.append(str(int(item)+2))

    #returns the list of routes as a json
    return jsonify(route_list)
    
#Sets up API and function for getRouteInfo, which returns a list of coordinate pairs
#example call http://127.0.0.1:5000/getRouteInfo?route_id={id}
@app.route("/getRouteInfo")
def getRouteInfo():
    #assigns route_id to user input
    route_id = request.args.get("routeId", type=int)
    
    #creates API url
    route_url = 'https://api.iq.inrix.com/route?routeId=' + route_id + '&format=json'
    
    #Calls route API, changes it to json
    route_info = requests.get(route_url, headers = header)
    route = route_info.json()

    #Creates list of waypoints
    route_waypoints = []
    
    #Pareses through json and adds each waypoint coordinate pair to the list, which gets returned as a json
    length = len(route['result']['trip']['wayPoints'])
    for i in range(length):
        route_waypoints.append(route['result']['trip']['wayPoints'][i]['geometry']['coordinates'])
    return jsonify(route_waypoints)

app.run()
   
   
    
    
    
   
   
    
    
    
    
