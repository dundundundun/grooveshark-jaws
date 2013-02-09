$(function () {
  // Handle Reddit add_top call:

  $(window).bind("reddit.add_top", function (e, reddit) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    addSongsFromReddit(reddit, "top");
  });

  $(window).bind("reddit.add_hot", function (e, reddit) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    addSongsFromReddit(reddit, "hot");
  });

  $(window).bind("reddit.add_new", function (e, reddit) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    addSongsFromReddit(reddit, "new");
  }); 

  function addSongsFromReddit(reddit, category)
  {  
      row_id = reddit + "-" + category + "-canvas";

      var row = {
        row_id: row_id,
        row_title: "/r/" + reddit, 
        row_description: category.charAt(0).toUpperCase() + category.slice(1) + " Tracks from r/" + reddit
      }

      addRow(row);

    $.get(
      "http://www.reddit.com/r/" + reddit + "/" + category + "/.json",
      {},
      function (response) {
        $.each(response.data.children, function (index, track) {
          //This should filter out a lot of Self.Music posts and full album streams
          if (track.data.title.match(/[-]/))
          {
            //Remove unnecessary parentheses. This will need to be revisited to make sure we aren't stripping off any feat./REMIX tags. 
            var prettyTrack = track.data.title.replace(/ *\([^)]*\) */g, "");
            //Remove square brackets 
            var prettyTrack = prettyTrack.replace(/ *\[[^)]*\] */g, "");
            //Split at the hyphen. The convention is typically {Artist Name} - {Song Name}
            var trackAndArtist = prettyTrack.split("-");
            add_track(trackAndArtist[0], trackAndArtist[1], row_id); 
          }
        });
      });
  };
});