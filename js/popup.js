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
});