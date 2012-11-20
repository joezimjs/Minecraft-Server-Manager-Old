define(
["app", "backbone", "lodash", "views/default", "views/list", "views/server"],

function(app, Backbone, _, DefaultView, ServerListView, ServerView) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			"main": "setRoute",
			"list": "setRoute",
			"server": "setRoute"
		},

		initialize: function() {
			// Whenever the Model state changes, make sure we're showing the correct info
			app.servers.on('all', _.bind(this.setRoute, this));

			// Determine where we should go right away
			this.setRoute();
		},

		setRoute: function() {
			var server = app.servers.currentServerId,
				ready = app.servers.ready,
				route = app.currentRoute;

			if (ready) {
				if (server) {
					if (route !== "server") {
						console.log('setRoute: server');
						this.server(server);
					}
				} else if (route !== "list") {
					console.log('setRoute: list');
					this.list();
				}
			}
			else if (route !== "main") {
				console.log('setRoute: main');
				this.main();
			}
		},

		main: function() {
			this.runRoute(!app.servers.ready, "main",
				function() {
					app.setView(new DefaultView());
				}
			);
		},

		list: function() {
			this.runRoute(app.servers.ready && !app.servers.currentServerId, "list",
				function() {
					app.setView(new ServerListView({model: app.servers}));
				}
			);
		},

		server: function() {
			this.runRoute(app.servers.currentServerId, "server",
				function() {
					app.setView(new ServerView({model: app.servers.currentServer}));
				}
			);
		},

		runRoute: function(condition, route, fn) {
			if (condition) {
				console.log('condition true for ' + route);
				app.currentRoute = route;
				fn.call(this);
			} else {
				console.log('condition false for ' + route);
				this.setRoute();
			}
		}
	});

	return Router;

});