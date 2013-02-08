$(function () {
  GroovesharkProxy.setSongStatusCallback(function (status) {
    console.log("Status", status);
  });

  window.add_track = function (artist, track, row) {

    console.log("add_track", artist, track);

    $.get(
      "http://tinysong.com/b/" + escape(artist) + "%20" + escape(track) + "?",
      {
        "key": "2cd026068570503ea1e976782b551f9e",
        "format": "json"
      },
      function (response) {
        var song = JSON.parse(response);
        console.log(song)
        if (song != null)
          if (song.SongID)
            addSongToRow($('#' + row), song);
      }
      );
  };

  window.addRow = function(row){

    $.get(chrome.extension.getURL('templates/songRow.htm'), function(template) { 
        var column1 = $('#column1').prepend(Mustache.render(template, row));

        var row_id = row['row_id'];

        $('#' + row_id + "-container").mouseenter(function(){
          $(this).find('.home-pageable-nav').show();
        });

        $('#' + row_id + "-container").mouseleave(function(){
          $(this).find('.home-pageable-nav').hide();       
        });


        $('#' + row_id + "-container").find('.next-pageable-nav').click(function(){
          
          var num_songs = $('#' + row_id).children().length;
          num_songs = Math.floor(num_songs/7); 
          var inc = (num_songs) * 980;  
          console.log(inc);
          s = $('#' + row_id + "-container").find('.home-content.home-grid').css('left');
          num = s.match(/\d+/g);
          number = parseFloat(num); 

          if (Math.abs(number) >= inc)
          {
            $('#' + row_id + "-container").find('.home-content.home-grid').animate({'left' : "0px"}, 600);
          }
          else
            $('#' + row_id + "-container").find('.home-content.home-grid').animate({'left' : "-=980"}, 600);
        });

        $('#' + row_id + "-container").find('.home-pageable-nav.previous-pageable-nav').click(function(){
          console.log("click");
          if ($('#' + row_id + "-container").find('.home-content.home-grid').css('left') == '0px')
          {
            var num_songs = $('#' + row_id).children().length;
            num_songs = Math.floor(num_songs/7); 
            var inc = (num_songs) * 980;  
            $('#' + row_id + "-container").find('.home-content.home-grid').animate({'left' : "-=" + inc}, 600); 
          }
          else
            $('#' + row_id + "-container").find('.home-content.home-grid').animate({'left' : "+=980"}, 600);
        });

    });
  };

  //$(window).bind('hashchange', function() {
    //if(window.location.hash == "#!/")
      //addLastFMRow();
  //});

});

 

function addSongToRow(row, song){

  $.get(chrome.extension.getURL('templates/byline.htm'), function(template) { 
      var rendered = Mustache.render(template, song);
      $(row).append(rendered).find('.module').mouseenter(function(){
        $(this).find('.my-btn').show();  
      }).find('.my-btn').hide();

      $(row).find('.module').mouseleave(function(){
        $(this).find('.my-btn').hide(); 
      });

      //has to be a better way to do this
      $("#" + song.SongID).click(function(){
        var track = $(this).attr('data-song-id');
        var songs = [track];
        GroovesharkProxy.addSongsByID(songs);
      });
  });


}