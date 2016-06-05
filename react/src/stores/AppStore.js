"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher')
  , ActionTypes = require('../constants/ActionTypes')
  , EventEmitter = require('events').EventEmitter
  , assign = require('object-assign')
  , CHANGE_EVENT = 'change'
  , _ = require('underscore');

var _item = {}
  , _action = ActionTypes.NO_ACTION;

var AppStore = assign({}, EventEmitter.prototype, {
  getItem: function() {
    return _item;
  },
  getActionType: function() {
    return _action;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.type) {
      case ActionTypes.REQUEST_DATA_SUCCESS:
        _item = action.item;
        _action = ActionTypes.REQUEST_DATA_SUCCESS;
        AppStore.emitChange();
        break;
      case ActionTypes.EMPTY_ITEMS:
        _action = ActionTypes.EMPTY_ITEMS;
        AppStore.emitChange();
        break;
      default:
        // do nothing
    }    
  })
});

module.exports = AppStore;