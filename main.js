var userName, userId;
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
	userId = response.id;
	userName = response.name;
	FB.api('/me/posts?limit=300', function(postsResponse){
	    var posts = postsResponse.data;
	    var dataToSend = {
		user_id: userId,
		user_name: userName,
		posts: []
	    };
	    _.each(posts, function(post){
		FB.api('/'+post.id+'/likes?summary=true', function(likesResponse){
		    var postObject = {
			post_id: post.id,
			post_content: post.message,
			post_likes: likesResponse.summary.total_count
		    };
		    dataToSend.posts.push(postObject);
		});
	    });
	    console.log(dataToSend);
	    document.getElementById('status').innerHTML = "Thanks, "+userName+" for sharing your data.";
	});
    });
}
