import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Template.postsList.helpers({
	lists:function(){
		return lists.find();
	}
});

Template.submitpost.events({
	'submit form':function(e){
		e.preventDefault();
		var post = {
			Name: $(e.target).find('[name=title]').val(),
			Age: $(e.target).find('[name=description]').val()
		};
		post._id = lists.insert(post);
		Router.go('postLayout', post);

	}
});


Template.editPost.events({
	'submit form':function(e){
		e.preventDefault();
		var currentPostid = this._id;
		var postProperties = {
			Name: $(e.target).find('[name=title]').val(),
			Age: $(e.target).find('[name=description]').val()
		};
		lists.update(currentPostid,{$set:postProperties}, function(error){
			if(error){
				return throwError(error.reason);
			}
			else{
				Router.go('postLayout', {_id:currentPostid});
			}
		});
	}
});

Template.error.helpers({
	error:function(){
		return Errors.find();
	}
});

Template.error.onRendered(function(){
	var error = this.data;
	Meteor.setTimeout(function(){
		Errors.remove(error._id);
	}, 2000);
});


Template.submitpost.onRendered(function(){
	Session.set('postSubmitErrors', {});
});

Template.submitpost.helpers({
	errorClass:function(field){
		return Session.get('postSubmitErrors')[field];
	},
	errorMessage:function(field){
		return !!Session.get('postSubmitErrors')[field]?'has-error':'';
	}
});

Template.commentslist.events({
	'submit form':function(e, template){
		e.preventDefault();
		var $body = $(e.target).find('[name=commentbody]');
		var comment = {
			author: Meteor.user().username,
			body:$body.val(),
			postId:template.data._id,
			submitted:new Date(),
			commentcount:0
		};
		lists.update(comment.postId, {$inc:{commentcount:1}});
		comment._id = Comments.insert(comment);
		Router.go('postLayout', post, comment);
	}
});


Template.commentslist.helpers({
	comment:function(){
		return Comments.find();
	}
});
