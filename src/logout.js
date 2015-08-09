"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function logout(callback) {
    callback = callback || function() {};

    var form = {
      pmid: "0"
    };

    defaultFuncs
      .post('https://www.facebook.com/bluebar/modern_settings_menu/?help_type=364455653583099&show_contextual_help=1', ctx.jar, form)
      .then(utils.parseResponse)
      .then(function(resData) {

        var elem = resData.jsmods.instances[0][2][0].filter(function(v) {
          return v.label === "Log Out";
      ***REMOVED***[0];

        var html = resData.jsmods.markup.filter(function(v) {
          return v[0] === elem.markup.__m;
      ***REMOVED***[0][1].__html;

        var form = {
          fb_dtsg: utils.getFrom(html, "\"fb_dtsg\" value=\"", "\""),
          ref: utils.getFrom(html, "\"ref\" value=\"", "\""),
          h: utils.getFrom(html, "\"h\" value=\"", "\""),
        };

        return utils
          .post('https://www.facebook.com/logout.php', ctx.jar, form)
          .then(utils.saveCookies(ctx.jar));
    ***REMOVED***
      .then(function(res) {
        if(!res.headers) throw {error: "An error occured when logging out."};

        return utils
          .get(res.headers.location, ctx.jar)
          .then(utils.saveCookies(ctx.jar));
    ***REMOVED***
      .then(function() {
        callback();
    ***REMOVED***
      .catch(function(err) {
        log.error("Error in logout", err);
        return callback(err);
    ***REMOVED***;
    return ctx.access_token;
  };
};
