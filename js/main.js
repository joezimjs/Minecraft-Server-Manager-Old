require(
["app", "router", "jquery", "models/servers"],

function(app, Router, $, ServerCollection) {

	// Attach a new method to Views to clean them up when we're done with them.
	Backbone.View.prototype.close = function() {
		if (this.beforeClose) {
			this.beforeClose();
		}
		this.remove();
		this.unbind();
	};

	app.servers = new ServerCollection();
	app.router = new Router();

	// Routes in this app are only for changing the View and the view being shown
	// is conditional upon the state of the app, therefore, we cannot automatically
	// route to what the current hash is set at, so we pass {silent:true}. We also
	// use {replace:true} in all routing to prevent history from being saved
	// because we do not want people to try to navigate around when those URLs
	// should not affect the state of the application.
	Backbone.history.start({silent: true});

	// Prevent the Default of all # links and route them
	$(document).on("click", "a[href^='#']", function(evt) {
		evt.preventDefault();
		Backbone.history.navigate($(this).attr('href'), {replace: true, trigger:true});
	});

	// Make app global so we can test things in the console
	window.app = app;
});