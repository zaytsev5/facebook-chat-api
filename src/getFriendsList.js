/*jslint node: true */
"use strict";

var cheerio = require("cheerio");
var utils = require("../utils");
var log = require("npmlog");

module.exports = function(mergeWithDefaults, api, ctx) {
  return function getFriendsList(id, callback) {
    if(!id) return log.error("getFriendsList: need id");
    if(!callback) return log.error("getFriendsList: need callback");

    id = parseInt(id);

    utils.get("https://www.facebook.com/" + id, jar, function(err, res, html) {
      if(err) return log.error("utils.get returned error on https://www.facebook.com/" + id);

      var maybeUrl = utils.getFrom(html, "window.location.replace(\"", "\");").split("\\/").join("/");

      if(maybeUrl.length === 0) return callback({error: "Problem retrieving friends list. Couldn't find redirect url."***REMOVED***;

      // Old profiles use profile.php?something=username and not
      // /username
      if(maybeUrl.indexOf("profile.php") !== -1) maybeUrl += "&sk=friends";
      else maybeUrl += "/friends";

      utils.get(maybeUrl, ctx.jar, function(err, res, html) {
        if(err) {
          log.error("utils.get returned error on " + maybeUrl + "/friends");
          return callback(err);
        }
        // Hacky way to remove commented out HTML
        html = html.split("<!--").join("").split("-->").join("");

        var maybeAllFriends = html.split("AllFriendsAppCollectionPagelet");
        if(maybeAllFriends.length === 1) maybeAllFriends = html.split("FriendsAppCollectionPagelet");
        if(maybeAllFriends.length === 1) return log.error("Couldn't find token on page. Assuming you can't access this person's friends: " + id);

        var token = utils.getFrom(maybeAllFriends[1], "\"token\":\"", "\"");

        var $ = cheerio.load(html);

        var friendsList = $(".uiProfileBlockContent div div div a");
        if(!friendsList) return callback({error: "Couldn't retrieve friends list from " + id + "."***REMOVED***;

        var friendsData = [];

        friendsList.map(function(i, v) {
          var res = null;
          try {
            res = JSON.parse($(v).attr("data-gt"));
          } catch(e) {
            return;
          }
          friendsData.push(parseInt(res.engagement.eng_tid));
      ***REMOVED***;

        var getFriendsFromId = function(lastId, cb) {
          var formFriendsList = mergeWithDefaults({
            data: {
              collection_token: token,
              cursor: new Buffer("0:not_structured:" + lastId).toString('base64'),
              tab_key:"friends",
              profile_id:id,
              overview:false,
              sk:"friends"
            }
        ***REMOVED***;

          utils.get("https://www.facebook.com/ajax/pagelet/generic.php/AllFriendsAppCollectionPagelet", ctx.jar, formFriendsList, function(err, res, html) {
            if(err) {
              log.error("error at AllFriendsAppCollectionPagelet", err);
              return cb(err);
            }

            var strData = utils.makeParsable(html);
            var ret;
            try{
              ret = JSON.parse(strData);
            } catch (e) {
              log.error("ERROR in getFriendsList --> ", e, strData);
              return cb(e);
            }

            var nextBatch = ret.jsmods.require.filter(function(v) {
              return v[0] === "AddFriendButton";
          ***REMOVED***.map(function(v) {
              return v[3][1];
          ***REMOVED***;

            if(nextBatch.length === 0) {
              return cb(null, []);
            }

            setTimeout(function() {
              getFriendsFromId(parseInt(nextBatch[nextBatch.length - 1]), function(err, data) {
                cb(err, nextBatch.concat(data));
            ***REMOVED***;
            }, 100);
        ***REMOVED***;
        };

        var lastId = parseInt(friendsData[friendsData.length-1]);

        getFriendsFromId(lastId, function(err, data) {
          callback(err, friendsData.concat(data));
      ***REMOVED***;
    ***REMOVED***;
  ***REMOVED***;
  }
};