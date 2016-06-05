"use strict";

var React = require("react")
	, ReactDOM = require("react-dom")
	, _ = require("underscore")
	, AppActionCreators = require("../actions/AppActionCreators");

var CityList = React.createClass({
	remove: function(item) {
		return function(e) {
			e.preventDefault();
			return this.props.onRemove(item);		
		}.bind(this);
	},
	render: function() {
		var createItem = function(item) {
			return (
				<li key={item.id}>
					<span>{item.text} </span>
					<a href data-id="{item.id}" onClick={this.remove(item)}>(x)</a>
				</li>
			);
		}.bind(this);
		return <ul>{this.props.items.map(createItem)}</ul>;
	}	
});

var ControlPanel = React.createClass({
	_updateState: function() {
    	var nextText = '';
    	var newItem = this.state.text;
    	if(_.find(this.state.items, function(it) {
    		return it.text.toLowerCase() == newItem.toLowerCase();
    	})) {
    		this.setState({items: this.state.items, text: ''})
    	} else {
	    	var nextItems = this.state.items.concat([{text: this.state.text, id: this.state.text}]);
    		var nextText = '';
    		this.setState({items: nextItems, text: nextText});
    	}		
	},
	_removeFromState: function(item) {
		var nextItems = _.filter(this.state.items, function(it) { return it.id != item.id; });
		this.setState({
			items: nextItems,
			text: ''
		});	
	},
	getInitialState: function() {
    	return {items: [], text: ''};
  	},
  	onChange: function(e) {
    	this.setState({text: e.target.value});
  	},
	addCity: function(e) {
		e.preventDefault();
		if(this.state.text === "") {
			console.log("empty city name field");
			return;
		}
		this._updateState();
	},
	search: function(e) {
		e.preventDefault();		
		AppActionCreators.emptyItems();
		AppActionCreators.requestWeather(this.state.items);
	},
	handleSubmit: function(e) {
    	e.preventDefault(); 
    	this._updateState();       
	},
	clear: function(e) {
		e.preventDefault();
		this.setState( this.getInitialState() );
		AppActionCreators.emptyItems();
	},
	render: function() {
        return (
	        <div id="controlPanel">
	            <form onSubmit={this.handleSubmit}>
		            <input id="cityInput" onChange={this.onChange} value={this.state.text} />
		            <div>
		                <button onClick={this.addCity}>{"Add city"}</button>
		                <button onClick={this.search}>{"Search"}</button>
		                <button onClick={this.clear}>{"Clear"}</button>
		            </div>
		            <CityList items={this.state.items} onRemove={this._removeFromState}/>
		         </form>
	        </div>	        
		);
	}
});

module.exports = ControlPanel;