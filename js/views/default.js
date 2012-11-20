define(
['backbone', 'lodash', 'jquery', 'text!templates/default.html'],

function(Backbone, _, $, template) {

	var DefaultView = Backbone.View.extend({

		initialize: function() {
			this.template = template;
		},

		render: function() {
			this.$el.html(this.template);

			return this.$el;
		}

	});

	return DefaultView;

});