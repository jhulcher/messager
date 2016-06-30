var ApiUtil = require("../util/api_util.js");
var React = require("react");
var Nav = require("./nav.jsx");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MessageStore = require("../stores/messages.js");
var cur = window.current_user_id

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
    interval = setInterval(function () {
      ApiUtil.fetchMessages(parseInt(this.props.location.query.id));
    }.bind(this), 500);
  },

  componentWillUnmount: function () {
    this.listener.remove();
    clearInterval(interval);
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
      <div className="full-page">
        <Nav></Nav>
        <div>
          {
            this.state.messages.map (function (message, idx) {
              if (!(message.body)) {
                return (
                    <header key={idx * 17}>
                      {"Messages with" + " " + message.friend + ":"}
                    </header>
                )
              } else if (idx == 0 && message.user_id != cur) {
                return (
                  <div key={idx * 17}>
                    <header>
                      {"Messages with" + " " + message.friend + ":"}
                    </header>
                    <div className="message-left">
                      <div className="">
                        { message.body }
                      </div>
                    </div>
                  </div>
                )
              } else if (idx == 0 && message.user_id == cur) {
                return (
                  <div key={idx * 17}>
                    <header>
                      {"Messages with" + " " + message.friend + ":"}
                    </header>
                    <div className="message-right">
                      <div className="">
                        { message.body }
                      </div>
                    </div>
                  </div>
                )
              }else if (message.user_id != cur) {
                return (
                  <div className="message-left"
                       key={idx * 17}>
                    <div className="">
                      { message.body }
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="message-right"
                       key={idx * 17}>
                    <div className="">
                      { message.body }
                    </div>
                  </div>
                )
              }
            }.bind(this))
          }
          <div className="message-box">
            <input type="text"
                   maxLength="140"
                   className=""
                   placeholder="New Message"
                   valueLink={this.linkState('content')}/>
            <div>
              <button onClick={this.createMessage}>
                New Message
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = User;
