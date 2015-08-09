"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function sendSticker(stickerID, threadID, callback) {
    if(!callback && utils.getType(threadID) === 'Function') {
      throw {error: "please pass a threadID as a second argument."};
    }

    if(!callback) {
     callback = function() {};
    }

    if (utils.getType(stickerID) !== "Number" && utils.getType(stickerID) !== "String") {
      throw {error: "StickerID should be of type Number or String and not " + utils.getType(stickerID) + "."};
    }
    if (utils.getType(threadID) !== "Number" && utils.getType(threadID) !== "String"){
      throw {error: "ThreadID should be of type Number or String and not " + utils.getType(threadID) + "."};
    }

    var messageAndOTID = utils.generateOfflineThreadingID();
    var form = {
      'client' : 'mercury',
      'message_batch[0][action_type]' : 'ma-type:user-generated-message',
      'message_batch[0][author]' : 'fbid:' + ctx.userID,
      'message_batch[0][timestamp]' : Date.now(),
      'message_batch[0][timestamp_absolute]' : 'Today',
      'message_batch[0][timestamp_relative]' : utils.genTimestampRelative(),
      'message_batch[0][timestamp_time_passed]' : '0',
      'message_batch[0][is_unread]' : false,
      'message_batch[0][is_cleared]' : false,
      'message_batch[0][is_forward]' : false,
      'message_batch[0][is_filtered_content]' : false,
      'message_batch[0][is_spoof_warning]' : false,
      'message_batch[0][source]' : 'source:chat:web',
      'message_batch[0][source_tags][0]' : 'source:chat',
      'message_batch[0][body]' : '',
      'message_batch[0][html_body]' : false,
      'message_batch[0][ui_push_phase]' : 'V3',
      'message_batch[0][status]' : '0',
      'message_batch[0][offline_threading_id]' : messageAndOTID,
      'message_batch[0][message_id]' : messageAndOTID,
      'message_batch[0][threading_id]': utils.generateThreadingID(ctx.clientID),
      'message_batch[0][manual_retry_cnt]' : '0',
      'message_batch[0][thread_fbid]' : threadID,
      'message_batch[0][sticker_id]' : stickerID,
      'message_batch[0][has_attachment]' : true,
      'message_batch[0][client_thread_id]' : "user:" + threadID,
      'message_batch[0][signatureID]' : utils.getSignatureID()
    };

    api.getUserInfo(threadID, function(err, res) {
      if(err) {
        throw err;
      }
      // This means that threadID is the id of a user, and the chat
      // is a single person chat
      if(Object.keys(res).length > 0) {
        form['message_batch[0][client_thread_id]'] = "user:" + threadID;
        form['message_batch[0][specific_to_list][0]'] = "fbid:" + threadID;
        form['message_batch[0][specific_to_list][1]'] = "fbid:" + ctx.userID;
      }

      if(ctx.globalOptions.pageID) {
        form['message_batch[0][author]'] = "fbid:" + ctx.globalOptions.pageID;
        form['message_batch[0][specific_to_list][1]'] = "fbid:" + ctx.globalOptions.pageID;
        form['message_batch[0][creator_info][creatorID]'] = ctx.userID;
        form['message_batch[0][creator_info][creatorType]'] = "direct_admin";
        form['message_batch[0][creator_info][labelType]'] = "sent_message";
        form['message_batch[0][creator_info][pageID]'] = ctx.globalOptions.pageID;
        form['request_user_id'] = ctx.globalOptions.pageID;
        form['message_batch[0][creator_info][profileURI]'] = "https://www.facebook.com/profile.php?id=" + ctx.userID;
      }

      defaultFuncs.post("https://www.facebook.com/ajax/mercury/send_messages.php", ctx.jar, form)
      .then(utils.parseResponse)
      .then(function(resData) {
        if (!resData) {
          throw {error: "Send sticker failed."};
        }
        if(resData.error) {
          throw resData;
        }

        return callback();
    ***REMOVED***
      .catch(function(err) {
        log.error("ERROR in sendSticker --> ", err);
        return callback(err);
    ***REMOVED***;
  ***REMOVED***;
  };
};
