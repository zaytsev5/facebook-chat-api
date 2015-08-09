"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  function makeTypingIndicator(typ, threadID, callback) {
    var form = {
      typ: +typ,
      to: '',
      source: 'mercury-chat',
      thread: threadID
    };

    // Check if thread is single person chat or group chat
    // More info on this is in api.sendMessage
    api.getUserInfo(threadID, function(err, res) {
      if (err) {
        throw err;
      }

      // If id is single person chat
      if(Object.keys(res).length > 0) {
        form.to = threadID;
      }

      defaultFuncs.post("https://www.facebook.com/ajax/messaging/typ.php", ctx.jar, form)
      .then(utils.parseResponse)
      .then(function(resData) {
        if(resData.error) {
          throw resData;
        }

        return callback();
    ***REMOVED***
      .catch(function(err) {
        log.error("Error in sendTypingIndicator", err);
        return callback(err);
    ***REMOVED***;
  ***REMOVED***;
  }

  return function sendTypingIndicator(threadID, callback) {
    if(!callback) {
      throw {error: "sendTypingIndicator: need callback"};
    }

    makeTypingIndicator(true, threadID, function(err) {
      if(err) {
        throw err;
      }

      return callback();
  ***REMOVED***;

    // TODO: document that we return the stop/cancel functions now
    return function end(cb) {
      makeTypingIndicator(false, threadID, cb || function() {***REMOVED***;
    };
  };
};
