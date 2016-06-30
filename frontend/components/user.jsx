var ApiUtil = require("../util/api_util.js");
var React = require("react");
var Nav = require("./nav.jsx");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MessageStore = require("../stores/messages.js");

var History = require("react-router").History;

var cur = window.current_user_id;

var User = React.createClass({

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return (
        { messages: [], content: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchMessages(parseInt(this.props.location.query.id));

    this.listener = MessageStore.addListener(function () {
      this.setState({ messages: MessageStore.all() });
    }.bind(this));
  },

  componentDidMount: function () {
    setInterval(function () {
      ApiUtil.fetchMessages(parseInt(this.props.location.query.id));
    }.bind(this), 500);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  createMessage: function (e) {
    e.preventDefault();

    ApiUtil.createMessage(this.props.location.query.id, this.state.content);

    this.setState({content: ""});
  },

  handleLogOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
  },

  render: function () {
    return (
      <div className="">

        <Nav></Nav>

        <div>
          {
            this.state.messages.map (function (message, idx) {
              return (
                <div key={message.message_id * 97}>
                  <div>
                    { message.author }
                  </div>
                  <div className="">
                    { message.body }
                  </div>
                </div>
              )
            }.bind(this))
          }
          <div>
            <input type="text"
                   maxLength="140"
                   className=""
                   placeholder="New Message"
                   valueLink={this.linkState('content')}/>
            <button onClick={this.createMessage}>
              New Post
            </button>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = User;
