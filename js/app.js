define(
["jquery", "lodash", "backbone"],

function($, _, Backbone) {

	// Provide a global location to place configuration settings and module
	// creation.
	var app = {
		// The root path to run the application.
		root: "/minecraft/",
		container: "#content",
		currentView: null,
		currentRoute: null
	};

	// Mix Backbone.Events, modules, and layout management into the app object.
	return _.extend(app, {
		setView: function(view) {
			if (this.currentView) {
				this.currentView.close();
			}

			this.currentView = view;

			$(this.container).html(view.render());
		}
	}, Backbone.Events);

});