$(function () {
  // Handle LastFM add_loved call:

  $(window).bind("cd.add_top", function () {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
      var row = {
        row_id: "cd101-top102-canvas",
        row_title: "Top 102 of 2012", 
        row_description: "These are the Top 102.5 songs of the year that had the most impact on the station."
      }

      addRow(row);

    $.get(
      "http://stark-everglades-6585.herokuapp.com/collections/1",
      {

      },
      function (response) {
      	console.log(response); 
        $.each(response, function (index, track) {
          console.log(track.artist);
          console.log(track.name);
          add_track(track.artist, track.name, "cd101-top102-canvas");
        });
      });
  });

  $(window).bind("pitchfork.add_best_new_tracks", function () {
    // TODO: Show an AJAX spinner and lock down the UI while it's getting the songs.
      var row = {
        row_id: "pitchfork-best-new-tracks-canvas",
        row_title: "Pitchfork Best New Tracks", 
        row_description: "Best new tracks as reviewed by Pitchfork's writing staff."
      }

      addRow(row);

    $.get(
      "http://stark-everglades-6585.herokuapp.com/collections/3",
      {

      },
      function (response) {
        console.log(response); 
        $.each(response, function (index, track) {
          console.log(track.artist);
          console.log(track.name);
          add_track(track.artist, track.name, "pitchfork-best-new-tracks-canvas");
        });
      });
  });
});