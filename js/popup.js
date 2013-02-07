// Popup UI Handlers:

$(function () {
  console.log("document ready");

  $("#hypem #add_popular").click(function () {
    console.log("#hypem #add_popular");
    chrome.tabs.executeScript(null, {code:"$(window).trigger('hypem.add_popular');"});
  });

  $("#lastfm #add_loved").click(function () {
    console.log("#lastfm #add_loved");
    // TODO: Validate that the username field has the required data.
    chrome.tabs.executeScript(null, {code:"$(window).trigger('lastfm.add_loved','" + $('#lastfm_username').val() + "');"});
  });

  $("#pitchfork #add_top_tracks").click(function () {
    //console.log("#pitchfork #add_top_tracks");
    chrome.tabs.executeScript(null, {code:"$(window).trigger('pitchfork.add_top');"});
  });

  $("#reddit #add_top").click(function () {
    console.log("#reddit #add_top");
    // TODO: Validate that the username field has the required data.
    chrome.tabs.executeScript(null, {code:"$(window).trigger('reddit.add_top','" + $('#subreddit').val() + "');"});
  });

  $("#reddit #add_hot").click(function () {
    console.log("#reddit #add_hot");
    // TODO: Validate that the username field has the required data.
    chrome.tabs.executeScript(null, {code:"$(window).trigger('reddit.add_hot','" + $('#subreddit').val() + "');"});
  });

  $("#reddit #add_new").click(function () {
    console.log("#reddit #add_new");
    // TODO: Validate that the username field has the required data.
    chrome.tabs.executeScript(null, {code:"$(window).trigger('reddit.add_new','" + $('#subreddit').val() + "');"});
  });
});

