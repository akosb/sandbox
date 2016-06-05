"use strict";

var React = require("react")
  , ReactDOM = require("react-dom")
  , ControlPanel = require("./ControlPanel")
  , ResultTable = require("./ResultTable")
  , ActionCreators = require("../actions/AppActionCreators")
  , AppStore = require("../stores/AppStore");

var App = React.createClass({	
  render: function() {
        return (
        	<div id="main">
        		<ControlPanel/>
				    <ResultTable />
        	</div>
		);
	}
});

module.exports = App;