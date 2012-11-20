define(
['app', 'backbone', 'lodash', 'jquery', 'views/list-item', 'text!templates/server-list.html'],

function(app, Backbone, _, $, ServerListItemView, tpl) {

	var ServerListView = Backbone.View.extend({

		initialize: function() {
			var self = this;

			this.template = tpl;
			this.subviews = [];

			app.servers.each(function(model) {
				self.subviews.push(new ServerListItemView({model:model}));
			});
		},

		render: function() {
			var self = this;
			this.$el.html(this.template);

			_.each(this.subviews, function(view) {
				self.$('.server-list').append(view.render());
			});

			return this.$el;
		},

		beforeClose: function() {
			_.each(this.subviews, function(view){
				view.close();
			});
		}

	});

	return ServerListView;

});