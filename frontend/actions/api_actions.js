var AppDispatcher = require("../dispatcher/Dispatcher.js");
var Constants = require("../constants/constants.js");

var ApiActions = {

  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: Constants.USERS_RECEIVED,
      users: users
    });
  },

  receiveMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: Constants.MESSAGES_RECEIVED,
      messages: messages
    });
  }

};

module.exports = ApiActions;
