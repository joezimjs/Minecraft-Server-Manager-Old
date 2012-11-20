define(
['app', 'backbone', 'lodash', 'jquery', 'text!templates/server.html', 'text!templates/console-line.html'],

function(app, Backbone, _, $, main_tpl, con_tpl) {
	var ServerView = Backbone.View.extend({

		initialize: function () {
			this.mainTemplate = _.template(main_tpl);
			this.conTemplate = _.template(con_tpl);

			this.model.on('change:console', this.addLine, this);
		},

		events: {
			"click .stop": "stop",
			"click .command-button": "command",
			"submit form": "command"
		},

		render: function () {
			this.$el.html(this.mainTemplate(this.model.toJSON()));

			return this.$el;
		},

		stop: function () {
			this.sendCommand('stop');
		},

		command: function (e) {
			e.preventDefault();
			var input = this.$('.command-line'),
				cmd = input.val();

			input.val('').focus();

			this.sendCommand(cmd);
		},

		sendCommand: function (cmd) {
			app.servers.issueCommand(cmd);
		},

		addLine: function (model) {
			var console = this.$('.console ul');
			console.append(this.conTemplate(this.model.toJSON()));
			console.scrollTop(console[0].scrollHeight);
		}

	});

	return ServerView;

});