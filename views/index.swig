<!DOCTYPE html>
<html>
<head>
<title>Facebook Login JavaScript Example</title>
<meta charset="UTF-8">
</head>
<body>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
<script src = "js/main.js"></script>

<fb:login-button autologoutlink="true" scope="user_posts" onlogin="checkLoginState();">
</fb:login-button>

<div id="status">
</div>
</body>
</html>
