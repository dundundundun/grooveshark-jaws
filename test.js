$(document).ready(function(){
	var that = this; 
    $("#popup_get_loved_tracks").click(function(){
        chrome.tabs.executeScript(null, {code:"$(window).trigger('lastFMGetLovedTracks','" + $('#user_name').val() + "');"});
	});
    $("#get_suggested").click(function(){
        var arr = [$('#user_name').val(), $('#number_of_tracks').val()];
        chrome.tabs.executeScript(null, {code:"$(window).trigger('lastFMGetRecommendedTracks','" + arr + "');"});
    });
});
