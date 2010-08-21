/**
 * Author: Eric J. Duran
 * 
 * This is the chrome script use to send and received the message from the client.
 * This is the only way to get access to the clients DOM.
 * 
 * This script also handles the "tabs" display
 */
 

//Roundtrip to Port.postMessage() after opening a channel.
function clientConnect(item) {
  chrome.tabs.getSelected(null, function(tab) {
    var port = chrome.tabs.connect(tab.id);
    port.postMessage({menu: item});
  
    port.onMessage.addListener(function getResp(response) {
      if(response.src){
		    $('#info-section').html(response.src);
			
			  //We have to bind it pretty late 
			  $('.toggler a').click(function(){
			    $(this).parent().parent().parent().children('.content').slideToggle();
			  });

			  //Open function links in a new tab
			  $('td a').click(function(){
			    chrome.tabs.create({url: $(this).attr("href")});
			  });
		  }
		  else{
		    $('#info-section').html("<span>Please make sure the Drupal for Firebug module is enable if your drupal site</span>");
		  }
    });
  });
}

function textReplace(text){
 var oldText = "/firebug/i";
 var newText = "Chrome";

 return text.replace(oldText, newText);
}

$(function(){
  $("#toolbar a").click(function() {
	  var form_item = $(this).attr("href");
		clientConnect(form_item);
		$("#toolbar a").removeClass('active');
		$(this).addClass('active');
	});
});