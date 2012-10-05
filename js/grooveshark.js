$(function () {
  GroovesharkProxy.setSongStatusCallback(function (status) {
    console.log("Status", status);
  });

  window.add_track = function (artist, track) {
    console.log("add_track", artist, track);

    $.get(
      "http://tinysong.com/b/" + escape(artist) + "%20" + escape(track) + "?",
      {
        "key": "2cd026068570503ea1e976782b551f9e",
        "format": "json"
      },
      function (response) {
        var song = JSON.parse(response);

        GroovesharkProxy.addSongsByID(song.SongID);
      }
      );
  };
});