$(document).ready(function(){
	var that = this; 
    $("#popup_get_loved_tracks").click(function(){
    	chrome.tabs.executeScript(null, {code:"$(window).trigger('lastFMGetLovedTracks','" + $('#user_name').val() + "');"});
	});
});
