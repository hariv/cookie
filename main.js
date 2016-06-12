  function statusChangeCallback(response) {
    if (response.status === 'connected') {
	testAPI();
    } else {
	document.getElementById('status').innerHTML = 'Please log ' +
	    'into Facebook.';
    }
}
  
function checkLoginState() {
    FB.getLoginStatus(function(response) {
	statusChangeCallback(response);
    });
}
  
window.fbAsyncInit = function() {
    FB.init({
	appId      : '1027371774015714',
	cookie     : true, 
	xfbml      : true,  
	version    : 'v2.6'
    });
  
    checkLoginState();
  
};
 
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  
function testAPI() {
    FB.api('/me', function(response){
	FB.api('/me/posts?limit=300', function(postsResponse){
	    console.log(postsResponse);
	    latestPost = postsResponse.data[1];
	    FB.api('/'+latestPost.id+'/likes?summary=true', function(finalResponse) {
		console.log(finalResponse);
		document.getElementById('status').innerHTML = 'Thanks, '+response.name+'!';
	    });
	});
    });
}
