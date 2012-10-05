$(function () {
  // Handle LastFM add_loved call:

  $(window).bind("lastfm.add_loved", function (e, username) {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.

    console.log("lastfm.add_loved");

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
          $.get(
            "http://tinysong.com/b/" + track.artist.name + "%20" + track.name + "?",
            {
              'key': "2cd026068570503ea1e976782b551f9e", 
              'format': 'json'
            },
            function (response) {
              var song = JSON.parse(response);

              GroovesharkProxy.addSongsByID(song.SongID);
            });
        });
      });
  });
});