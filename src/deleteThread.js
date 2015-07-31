/*jslint node: true */
"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function deleteThread(threadOrThreads, callback) {
    if(!callback) callback = function(){};

    var form = {
      client: 'mercury',
    };

    if(Array.isArray(threadOrThreads)) {
      for (var i = 0; i < threadOrThreads.length; i++) {
        form['ids['+i+']'] = threadOrThreads[i];
      }
    } else {
      form['ids[0]'] = threadOrThreads;
    }

    defaultFuncs.post("https://www.facebook.com/ajax/mercury/delete_thread.php", ctx.jar, form)
      .then(utils.parseResponse)
      .then(function(resData) {
        if (resData.error) return callback(resData);

        return callback();
    ***REMOVED***
      .catch(function(err) {
        log.error("Error in deleteThread", err);
        return callback(err);
    ***REMOVED***;
  };
};
