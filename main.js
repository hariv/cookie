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
};
 
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
 
function sendToServer(dataToSend) {
    var xmlhttp = new XMLHttpRequest();
    var url = "/save";
    var params = "data="+dataToSend;
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
	    document.getElementById('status').innerHTML = "Thanks, "+userName;
            console.log(http.responseText);
	}
    }
    xmlhttp.send(params);
}

function getData() {
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
	    console.log(posts.length);
	    _.each(posts, function(post){
		FB.api('/'+post.id+'/likes?summary=true', function(likesResponse){
		    var postObject = {
			post_id: post.id,
			post_content: post.message,
			post_likes: likesResponse.summary.total_count
		    };
		    dataToSend.posts.push(postObject);
		    if(dataToSend.posts.length == posts.length) {
			document.getElementById('status').innerHTML = "Fetching your data, "+userName;
			sendToServer(dataToSend);
		    }
		});
	    });
	});
    });
}
