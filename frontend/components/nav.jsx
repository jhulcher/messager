var ApiUtil = require("../util/api_util.js");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');

var History = require("react-router").History;

var Nav = React.createClass({

  mixins: [History, LinkedStateMixin],

  goToIndex: function (e) {
    e.preventDefault();
    this.history.pushState( null, "/");
  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
  },

  render: function () {
    return (
      <div className="nav">
        <div className="">
          <span className="button-link"
                onClick={this.goToIndex}>
            Index
          </span>
          <span className="button-link"
              onClick={this.handleLogOut}>
            Sign Out
          </span>

        </div>
      </div>
    );
  }

});

module.exports = Nav;
