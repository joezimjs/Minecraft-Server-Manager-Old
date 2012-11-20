require.config({

  deps: ["main", 'parseUrl'],

  paths: {
    // Libraries.
    jquery: "libs/jquery.min",
    lodash: "libs/lodash.min",
    backbone: "libs/backbone.min",
    io: "libs/socket.io.min",
    // RequireJS Text Plugin
    text: "libs/text.min",
    // jQuery ParseUrl Plugin
    parseUrl: "libs/jquery.parseurl.min",
    // HTML templates
    templates: "../templates"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    'backbone': {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Socket.io needs to export its library
    'io': {
      deps: [],
      exports: 'io'
    },

    // jQuery plugins depend on jQuery
    'parseUrl': ['jquery']

  }

});
