# What is this?

This is a small project that will allow the user to examine the coverage of transit systems in an aera, by querying [OpenStreetMap](https://www.openstreetmap.org). This gives a very rough sense about how easy it is to access transit in an area, and where that transit exists.

The base project was created with `create-react-app`.

# How to run this?

From the root folder, run `npm install`. This will install all of the necessary packages to run the app. Then, run `npm start`. This will start a web server locally at port 3000. If a window does not open automatically, you can access the page at `localhost:3000` in any web browser.

Use the dropdown to select a predefined city, or click "Zoom to Location" to use your current location. Drag to move the map, scroll to zoom, and click to re-center the map.

# What does it mean?

The blue zone shows everything within roughly a 3-minute walk, or 240m, of a transit station. The blue zone extends 10km from your center point, which can be changed by selecting a new location or clicking the map.
