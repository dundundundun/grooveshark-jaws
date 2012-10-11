$(function () {
  // Handle Reddit add_top call:

  $(window).bind("reddit.add_top", function (e, reddit) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    console.log(reddit); 
    
    $.get(
      "http://www.reddit.com/r/" + reddit + "/hot/.json",
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
            add_track(trackAndArtist[0], trackAndArtist[1]); 
          }
        });
      });
  });
});