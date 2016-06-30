var ApiUtil = require("../util/api_util.js");
var UsersStore = require("../stores/users.js");
var React = require("react");
var Nav = require("./nav.jsx");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cur = window.current_user_id;

var History = require("react-router").History;

var Index = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
      { users: [] }
    );
  },

  componentWillMount: function () {

    ApiUtil.fetchUsers();

    this.usersListener = UsersStore.addListener(function () {
      this.setState({ users: UserStore.all() });
    }.bind(this));

  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
  },

  componentWillUnmount: function () {
    this.usersListener.remove();
  },

  handleUserClick: function (id) {
    this.history.pushState(null, "user/" + id, {id: id} );
  },

  render: function () {
    return (
      <div className="">
        <Nav></Nav>
        <header>
          Choose a Friend to Message:
        </header>
        {
          this.state.users.map (function (user, idx) {
            return (
              <div key={user.id * 77}>
                <div className="name-link"
                      onClick={this.handleUserClick.bind(null, user.id)}>
                  {user.username}
                </div>
              </div>
            )
          }.bind(this))
        }
      </div>
    )
  }

});

module.exports = Index;
