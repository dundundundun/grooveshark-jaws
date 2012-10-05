GroovesharkProxy.setSongStatusCallback(function(status) {
  console.log("Status", status);
  //GroovesharkProxy.addSongsByID(32559094);
  //console.log(this);
});

$(document).ready(function(){
	
	//Get User's loved tracks
	$(window).bind("lastFMGetLovedTracks", function(e, myname){
	
		$.get(
		"http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks",
		{'user': myname, 'api_key' : "e6e54bcc49f43a86ee275b5d831dde4e", 'format' : 'json', "limit" : "1000"},
		function(response){
			console.log(response); 
			$.each(response.lovedtracks.track, function(index, track){
				console.log("http://tinysong.com/b/" + track.artist.name + "%20" + track.name);
				$.get(
					"http://tinysong.com/b/" + track.artist.name + "%20" + track.name + "?",
					{'key' : "2cd026068570503ea1e976782b551f9e", 'format' : 'json'},
					function(response){
						var song = JSON.parse(response);
						GroovesharkProxy.addSongsByID(song.SongID); 
					}); 
			});
		});	

	});

	//Get User's recommended tracks from LastFM
	$(window).bind("lastFMGetRecommendedTracks", function(e, params){
		var temp_arr = params.split(',')
		var myname = temp_arr[0]; 
		var track_number = temp_arr[1];
		console.log(myname); 
		console.log(track_number); 
		$.get(
		"http://ws.audioscrobbler.com/2.0/?method=user.getnewreleases",
		{'user': myname, 'api_key' : "e6e54bcc49f43a86ee275b5d831dde4e", 'format' : 'json', "limit" : "1000"},
		function(response){
			console.log(response); 
			$.each(response.albums.album, function(index, album){
				$.get(
				"http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks",
				{'artist': album.artist.name, 'api_key' : "e6e54bcc49f43a86ee275b5d831dde4e", 'format' : 'json', "limit" : track_number},
				function(response){
					console.log(response);
					$.each(response.toptracks.track, function(index, track){
						console.log("http://tinysong.com/b/" + track.artist.name + "%20" + track.name);
						$.get(
							"http://tinysong.com/b/" + track.artist.name + "%20" + track.name + "?",
							{'key' : "2cd026068570503ea1e976782b551f9e", 'format' : 'json'},
							function(response){
								var song = JSON.parse(response);
								GroovesharkProxy.addSongsByID(song.SongID); 
							}); 
					});
				});
			});
		});	

	});


}); 








