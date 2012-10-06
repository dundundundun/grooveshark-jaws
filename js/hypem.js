$(function () {
  // Handle Hype Machine add_popular call:

  $(window).bind("hypem.add_popular", function (e) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    $.get("http://hypem.com/feed/popular/rss/1/feed.xml", function (data) {
      $rss = $(data);

      $rss.find('title').each(function (index, title) {
        var title = $.trim($(title).text());
        var title_parts = title.split(" - ");

        add_track(title_parts[0], title_parts[1]);
      });
    });
  });
});