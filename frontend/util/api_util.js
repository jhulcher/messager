var ApiActions = require("../actions/api_actions.js");

var initialState = {
  loading: false,
  errorMessage: '',
  messages: [],
};

var ApiUtil = {


  fetchUsers: function () {
    $.ajax({
      url: "/api/users",
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveUsers(response);
      }
    });
  },

  fetchMessages: function (id) {
    $.ajax({
      url: "/api/users/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        ApiActions.receiveMessages(response);
      }
    });
  },

  createMessage: function (id, message) {
    $.ajax({
      url: "/api/messages",
      method: "POST",
      dataType: "json",
      data: {
        message: {
          listener_id: id,
          message: message
        }
      },
      success: function (response) {
        ApiActions.receiveMessages(response);
        // socket.emit("RECEIVE_MESSAGES", ApiActions.receiveMessages(response));
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function (response) {
        window.location.href = "/";
      }
    });
  }

};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
