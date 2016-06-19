var mongoose = require('mongoose');

var querySchema=mongoose.Schema({
	userid: String,
	username: String,
	posts: []
});

var Post=mongoose.model('Post',querySchema);
module.exports=Post;

