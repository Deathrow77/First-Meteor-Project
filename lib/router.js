Router.configure({
	layoutTemplate:"basiclayout",
	waitOn:function(){return Meteor.subscribe('allposts');}
});
Router.route('/', {name:'welcome'});
Router.route('/posts/', {name:'postsList'});
Router.route('/posts/:_id', {
	name:'postLayout',
	waitOn:function(){
		return Meteor.subscribe('comments', this.params._id);
	},
	data:function(){ return lists.findOne(this.params._id);}
});
Router.route('/submit',{name:'submitpost'});

var LoginRequire = function(){
	if(! Meteor.user()){
		this.render("AccessDenied");
	}
	else{
		this.next();
	}
}

Router.route("/posts/:_id/edit",{
	name:'editPost',
	data:function(){return lists.findOne(this.params._id)}
});
Router.onBeforeAction(LoginRequire, {only:'submitpost'});
