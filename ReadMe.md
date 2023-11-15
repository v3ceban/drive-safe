# Drive Safe

## Inspiration

Car accidents are the second leading cause of death among teens. Additionally, the experience of being a new driver is summarized by dread and anxiety, especially towards highways. This marked an obvious need for improvements to the learning process, especially considering the 27 million Americans in California alone getting their license each year. We noticed that through the vast data of Inrix APIs, we could determime routes for beginners to expand difficulty as their comfort grows. With new drivers provided smarter, and safer routes, we believe we can alleviate danger for millions of Americans.

## What does it do?

A user provides a desired duration for the trip and difficulty tier, ranging from easy and medium being strictly on local roads and differing on time, and hard, which specifically locates a highway. Waypoints for this route are created, with easy and medium difficulties remaining nearby the start location incase any issues arise, but all routes are guaranteed to end at the start location (making a loop). These routes are uniquely based on the start location and can differ from repeated trips. Then, the route automatically is output as a map preview and Google Maps link, allowing the user to easily follow the provided course on their personal device.

## How was it built?

The program's backend depends on the Inrix Drivetime Polygon API and Inrix FindRoute API. Our Python-based Flask API back-end utilzes Drivetime Polygon to determine a wide variety of locations around the user that can be included as waypoints (rather than fixed points). This approach is also used to find freeways for hard difficulty, which are determined by the farthest possible route available in a given time (inherently being the road with the highest speed limit). The FindRoute API is then crucial to ensure the total trip never exceeds the provided max trip time via "travel time minutes" of each waypoint section being cumulated. Before starting with front-end development, we designed the UI and prototyped the website in Figma. The website's UI and UX were crafted with React Native, and polished with SASS and CSS3. We're running it with Vite.js and NPM through a Node.js server. We also used Mapbox API for geocoding user-provided addresses to use them as starting points for the routes. This and other user-provided data are sent through React hooks as a JSON query to our Flask API, which is processed, returned to the front-end, and combined into a Google Maps URL.

## Challenges we faced

The night before the Hackathon began, after an hour-long prep meeting, we discovered our original idea had been done at an Inrix Hackathon before and had to adjust our idea to provide an impactful product. Additionally, we did not realize until during the event that the APIs and data locations were severely limited relative to the descriptions on the website we viewed beforehand, forcing us to redesign our entire previously-planned routing design. Additionally within routing, we had to scrape or adjust many ideas to better fit our updated plans, such as previously including multiple speed limit tiers/zones that were ultimately too restrictive/unrealistic to guarantee or a variety of highway safety checks that were not possible due to our available data being restricted to a small region (our highway distance routes exceed San Francisco's boundary).

## Accomplishments we are proud of

None of our team had experience with APIs, Hackathons, combining front-ends with back-ends, and met four days before. Additionally, our back-end team had limited Python experience and our front-end had limited React experience. Yet, despite nonstop roadblocks, we never gave up, continued to collaberate incredibly effectively, and shifted our ideas to fit the opportunity we were given to ultimately produce a working product that achieves our initial goal. In particular, our routing function was particularly daunting at first and featured at least 5 approaches before discovering the implimentation through Drivetime Polygons.

## What we learned

We learned how to create a project as a team with a seperate front-end and back-end. Additionally, we gained invaluable practical experience with a variety of industry technologies and applications. It's rare to get opportunities in classes to follow a project from scratch to completition and the added time limit also expanded our collaberation under pressure.

## What's next for Drive Safe?

The team believes in the variety of ambitious goals we planned when we first thought of Drive Safe. Although we were slowed down as we worked to guarantee a functional product, we still have additional features we wish to include such as the ability to find drivers a parking lot within their route to practice in, avoid construction zones and one-way streets, limit turns for beginners, and rate the safety of highways to determine the best local highways for a driver's first time. New drivers are begging for a new way to build their confidence before venturing into a dangerous world, and we believe we have the project to provide it.
