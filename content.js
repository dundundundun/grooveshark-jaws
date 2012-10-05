GroovesharkProxy.setSongStatusCallback(function(status) {
  console.log("Status", status);
  //GroovesharkProxy.addSongsByID(32559094);
  //console.log(this);
});

$(document).ready(function(){
	$(window).bind("shout", function(e, myname){
		console.log("now we're cooking with gas, " + myname); 
	
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
}); 








