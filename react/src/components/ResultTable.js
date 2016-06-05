"use strict";

var React = require("react")
	, ReactDOM = require("react-dom")
	, _ = require("underscore")
	, ActionTypes = require('../constants/ActionTypes')
	, AppStore = require("../stores/AppStore");



var CityList = React.createClass({
	sortBy: function(field, direction) {
		return function(e) {
			e.preventDefault();
			return this.props.onSortBy(field, direction);
		}.bind(this);
	},
	render: function() {
		var createItem = function(item, index) {
			return (
				<tr key={item.id} className={(index % 2) > 0 ? 'odd' : 'even'}>
					<td>{item.name}</td>
					<td className="right">{item.main.temp} &#8451;</td>
					<td className="right">{item.main.pressure} hpa</td>
					<td className="right">{item.main.humidity} %</td>
				</tr>
			);
		}.bind(this);
		return (
			<table>
                <thead>
                    <tr>
                        <th>
                        	Name
                            <span className="sort" onClick={this.sortBy( 'name', 'asc')}>&#9650;</span>
                            <span className="sort" onClick={this.sortBy( 'name', 'desc')}>&#9660;</span>
                        </th>
                        <th>
                        	Temp
                        	<span className="sort" onClick={this.sortBy( 'temp', 'asc')}>&#9650;</span>
                            <span className="sort" onClick={this.sortBy( 'temp', 'desc')}>&#9660;</span>
                        </th>
                        <th>
                        	Pressure
                            <span className="sort" onClick={this.sortBy( 'pressure', 'asc')}>&#9650;</span>
                            <span className="sort" onClick={this.sortBy( 'pressure', 'desc')}>&#9660;</span>
                        </th>
                        <th>
                        	Humidity
                            <span className="sort" onClick={this.sortBy( 'humidity', 'asc')}>&#9650;</span>
                            <span className="sort" onClick={this.sortBy( 'humidity', 'desc')}>&#9660;</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
					{this.props.items.map(createItem)}
				</tbody>
			</table>
		);
	}	
});

var ResultTable = React.createClass({
	getInitialState: function() {
    	return {items: []};
  	},
	_onChange: function() {		
		if(this.isMounted()) {
			var actionType = AppStore.getActionType();
			switch(actionType) {
	      		case ActionTypes.REQUEST_DATA_SUCCESS:
					var nextItem = AppStore.getItem();
					if(_.find( this.state.items, function(it) {
						return it.id === nextItem.id;
					} )) {
						console.log("already there");
					} else {
						var nextItems = this.state.items.concat(nextItem);
						this.setState({items: nextItems });
					}
					break;
				case ActionTypes.EMPTY_ITEMS:
					this.setState( this.getInitialState() );
					break;
				default:
					//no action
			}
		}
	},
	_sortBy: function(field, direction) {
		var nextItems = this.state.items;
		nextItems.sort(function(a, b) {
            if (field === 'name') {
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
            return parseFloat(a.main[field]) - parseFloat(b.main[field]);
        });

        if (direction === "desc") {
            nextItems.reverse();
        }
        this.setState( nextItems );
	},
	componentDidMount: function() {
		AppStore.addChangeListener( this._onChange );
	},
	render: function() {
        return (
	        <div id="resultPanel">
	        	<CityList items={this.state.items}  onSortBy={this._sortBy} />
	        </div>	        
		);
	}
});

module.exports = ResultTable;