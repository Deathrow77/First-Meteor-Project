import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('allposts',function(){
  	return lists.find({}, {fields:{Age:false}});
  });
  Meteor.publish('comments', function(postId){
  	check(postId, String);
  	return Comments.find({postId:postId});
  });
});
