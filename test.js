$(document).ready(function(){
	var that = this; 
    $("#popup_get_loved_tracks").click(function(){
    	//.executeScript(null, {code:"alert(\"hi from background CODE\");"});
    	console.log(this); 
    	console.log(that);
    	console.log(window);  
    	console.log(chrome.tabs);  
    	chrome.tabs.getSelected(null, function(response){
    		console.log(response); 
    	});  
    	chrome.windows.getCurrent(function(win)
		{
			console.log(win); 
		}); 
		console.log($('#user_name').val()); 
    	chrome.tabs.executeScript(null, {code:"$(window).trigger('shout','" + $('#user_name').val() + "');"});
	});
});
