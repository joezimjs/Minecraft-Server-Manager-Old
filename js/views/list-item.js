define(
['app', 'backbone', 'lodash', 'jquery', 'text!templates/server-list-item.html'],

function(app, Backbone, _, $, tpl) {
	var ServerListItemView = Backbone.View.extend({

		initialize: function() {
			this.template = _.template(tpl);
		},

		events: {
			"click": "startServer"
		},

		render: function() {
			this.$el = $(this.template(this.model.toJSON()));
			this.delegateEvents();

			return this.$el;
		},

		startServer: function() {
			app.servers.start(this.model.id);
		}

	});

	return ServerListItemView;

});