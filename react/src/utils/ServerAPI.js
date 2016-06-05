"use strict";

var ActionCreators = require("../actions/ServerActionCreators")
	, d3_request = require("d3-request")
	, d3_queue = require("d3-queue");

var ServerAPI = {
	requestWeather: function(items) {

	    var apiKey = "16f54bd9cf09968485ece27566519fc3";
	    var appId = "&appid=" + apiKey;
	    var metric = "&units=metric";
	    var httpTarget = "http://api.openweathermap.org/data/2.5/weather";		
		var queue = d3_queue.queue();

        items.forEach( function(item) {
	        queue.defer(
		        d3_request.json,
	    	    httpTarget + "?q=" + item.text.toLowerCase() + appId + metric,
	        	ActionCreators.handleDataSuccess
        	);

        });
		
	}
};

module.exports = ServerAPI;