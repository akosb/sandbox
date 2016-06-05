(function() {

    var d3_queue = require("d3-queue");
    var d3_request = require("d3-request");
    var _ = require("underscore");

    var apiKey = "16f54bd9cf09968485ece27566519fc3";
    var appId = "&appid=" + apiKey;
    var metric = "&units=metric";
    var httpTarget = "http://api.openweathermap.org/data/2.5/weather";

    var cityInput = document.getElementById("cityInput");
    var cityList = document.getElementById("cities");
    var resultTable = document.getElementById("resultTable");

    var tableData = [];

    var sortBy = function(it, direction) {

        tableData.sort(function(a, b) {
            if (it === 'name') {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }
            return parseFloat(a.main[it]) - parseFloat(b.main[it]);
        });

        if (direction === "desc") {
            tableData.reverse();
        }

        resultTable.innerHTML = "";
        for (var item in tableData) {
            createRow(tableData[item], (resultTable.rows.length % 2) > 0 ? 'odd' : 'even');
        }
    };

    var td = function(it, tdClass) {
        var td = document.createElement("td");
        td.setAttribute("class", tdClass ? tdClass : "right");
        var textNode = document.createTextNode(it);
        td.appendChild(textNode);
        return td;
    };

    var createRow = function(it, rowClass) {
        var tr = document.createElement("tr");
        tr.setAttribute("class", rowClass);
        tr.appendChild(td(it.name, "left"));
        tr.appendChild(td(it.main.temp + " \u2103"));
        tr.appendChild(td(it.main.pressure + " hpa"));
        tr.appendChild(td(it.main.humidity + " %"));
        resultTable.appendChild(tr);
    };

    var insertRow = function(error, it) {
        if (!error) {
            // it data is not stored yet
            if (!_.find(tableData, function(item) {
                    return it.name === item.name;
                })) {
                tableData.push(it);
            }
            createRow(it, (resultTable.rows.length % 2) > 0 ? 'odd' : 'even');
        } else {
            console.log("error", error);
        }
    };

    var search = function() {
        resultTable.innerHTML = "";
        var queue = d3_queue.queue();
        var listItems = cityList.children;
        if (!listItems.length || listItems.lentgh < 0) {
            console.log("Nothing to search");
            return false;
        }
        for (var i = 0; i < listItems.length; i++) {
            queue.defer(
                d3_request.json,
                httpTarget + "?q=" + listItems[i].innerHTML + appId + metric,
                insertRow
            );
        }
        return false;
    };

    var clearCities = function() {
        tableData = [];
        cityList.innerHTML = "";
        resultTable.innerHTML = "";
        return false;
    };

    var removeCity = function(it) {
        var cityName = it.target.innerHTML;
        it.target.parentNode.removeChild(it.target);
        if (tableData.length > 0) {
            tableData = _.filter(tableData, function(item) {
                return item.name.toLowerCase() != cityName.toLowerCase();
            });
        }
    };

    var createLi = function(it) {
        var textNode = document.createTextNode(it);
        var li = document.createElement("li");
        li.appendChild(textNode);
        li.onclick = removeCity;
        cities.appendChild(li);
    };

    var addCity = function(it) {
        var cityName = (!it) ? cityInput.value : it;
        var listItems = cityList.children;
        if( !cityName || cityName === "") {
            console.log("Empty city name.");
            return false;
        }
        if (!_.find(listItems, function(item) {                
                return item.innerHTML.toLowerCase() === cityName.toLowerCase();
            })) {
            createLi(cityName);
        } else {
            console.log(cityName, "is already there");
        }
        return false;
    };

    var enterCity = function(event) {
        if (event.keyCode == 13) {
            var cityName = cityInput.value;
            cityInput.value = "";
            if (!cityName) {
                console.log("City name input empty");
                return false;
            }
            addCity(cityName);
            return false;
        }
    };

    // some initial data on load
    var load = function() {
        addCity("London");
        addCity("Berlin");
        addCity("Budapest");
        addCity("Oslo");
        addCity("Paris");
    };


    controller = {
        load: load,
        addCity: addCity,
        enterCity: enterCity,
        search: search,
        clearCities: clearCities,
        sortBy: sortBy,
    };

}());
