var mongoose = require('mongoose');

var querySchema=mongoose.Schema({
	user_id: String,
	user_name: String,
	posts: []
});

var Post=mongoose.model('Post',querySchema);
module.exports=Post;

