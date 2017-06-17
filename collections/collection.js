// Lists Collection begins here


lists = new Mongo.Collection("lists");
lists.allow({
	insert:function(userID, doc){
	return !! userID;
}
});



// Comments Collection begins here



Comments = new Mongo.Collection('comments');
Comments.allow({
	insert:function(userID, doc){
		return !! userID;
	}
});
Meteor.methods({
	'commentinsert':function(commentAttributes){
		check(this.userId, String);
		check(commentAttributes, {
			postId:String,
			body:String
		});
		var user = Meteor.user();
		var post = lists.findOne(commentAttributes.postId);
		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentcount:0
		});
		return Comments.insert(comment);
	}
});
