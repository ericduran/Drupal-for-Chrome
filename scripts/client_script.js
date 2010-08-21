if($('#drupalforfirebug_general').length != 0){
  chrome.extension.sendRequest("show_page_action");

	chrome.extension.onConnect.addListener(function(port) {
		port.onMessage.addListener(function(msg) {
			var data = $(msg.menu).html();
			port.postMessage({src: data});
		});
	});

	chrome.extension.onRequest.addListener(
	  function(request, sender, sendResponse) {
			sendResponse({counter: request.counter});
	  }
	);
}