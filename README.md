# Sandbox
... to host _"Weather app skill test"_

# Tasks
* Build a simple web app that fetches weather data from http://openweathermap.org/current. 
* Allow the user to enter any number of cities to search for, in any way you prefer, but it should be possible to enter at least five cities before searching. 
* Each city should be fetched asynchronously and when any result is returned, the list of results should be updated. 
* Allow the user to change the ordering of the results (for example allow sorting by temperature, name of the location, etc.). 
* You may use any programming language, frameworks and libraries.

# Comments
* javascript is used, with node/npm on client side
* 2 variatons are implemeted
* _quick_ is "vanilla" javascript, with some d3 libraries
* _react_ is implemented using several npm packages esp. react + flux
* minimum UI formatting is implemented ( bootstrap or semantic-ui could be applied easily)
* error messages printed to the console
* assumes that a web server is available (eg. nginx)

# Build
```
git clone git@github.com:akosb/sandbox.git
cd sandbox
npm install
npm run build-quick
mkdir react/dist
npm run build-react-vendor
npm run build-react
```
