"use strict";

var ServerAPI = require('../utils/ServerAPI')
  , AppDispatcher = require('../dispatcher/AppDispatcher')
  , ActionTypes = require('../constants/ActionTypes');

var AppActionCreators = {
  requestWeather: function(it) {
    ServerAPI.requestWeather(it);
  },
  emptyItems: function() {
  	AppDispatcher.emptyItems({
  		type: ActionTypes.EMPTY_ITEMS
  	});
  }
};

module.exports = AppActionCreators;