"use strict";

var Dispatcher = require('flux').Dispatcher
  , assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher, {

  handleServerAction: function(action) {
    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }
    this.dispatch({
      action: action
    });
  },
  emptyItems: function(action) {
    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }
    this.dispatch({
      action: action
    });
  }

});


module.exports = AppDispatcher;