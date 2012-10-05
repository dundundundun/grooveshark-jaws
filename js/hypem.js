$(function () {
  // Handle Hype Machine add_popular call:

  $(window).bind("hypem.add_popular", function (e) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    console.log("hypem.add_popular");
  });
});