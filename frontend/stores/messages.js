var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/Dispatcher");
var CONSTANTS = require("../constants/constants.js");

var _messages = [];

var MessageStore = new Store(AppDispatcher);

var resetMessages = function (messages) {
  _messages = messages;
};

MessageStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CONSTANTS.MESSAGES_RECEIVED:
      resetMessages(payload.messages);
      MessageStore.__emitChange();
      break;
  }
};

MessageStore.all = function () {
  if (_messages.length > 1) {
    return _messages.slice(0);
  } else {
    return _messages;
  }
};

window.MessageStore = MessageStore;

module.exports = MessageStore;
