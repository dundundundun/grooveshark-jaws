$(function () {
  // Handle LastFM add_loved call:

  $(window).bind("lastfm.add_loved", function (e, username) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
    $.get(
      "http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks",
      {
        'user': username, 
        'api_key': "e6e54bcc49f43a86ee275b5d831dde4e", 
        'format': 'json', 
        "limit": "1000"
      },
      function (response) {
        $.each(response.lovedtracks.track, function (index, track) {
          add_track(track.artist.name, track.name);
        });
      });
  });
});