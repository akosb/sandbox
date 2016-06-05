"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher')
	,	ActionTypes = require('../constants/ActionTypes');

var ServerActionCreators = {
	handleDataSuccess: function(error, result) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.REQUEST_DATA_SUCCESS,
			item: result
		});
	}
};

module.exports = ServerActionCreators;