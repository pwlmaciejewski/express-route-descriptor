(function() {
  var routeDescriptor, _;

  _ = require('underscore');

  module.exports = routeDescriptor = {
    createRouteDescriptors: function(descriptors) {
      return _.map(descriptors, routeDescriptor.createRouteDescriptor);
    },
    createRouteDescriptor: function(desc) {
      return _.extend({}, routeDescriptor.getDefaultDescriptor(), desc);
    },
    getDefaultDescriptor: function() {
      return {
        method: 'get',
        path: '/',
        handler: routeDescriptor.getDefaultHandler()
      };
    },
    getDefaultHandler: (function() {
      var defaultHandler;

      defaultHandler = function(req, res, next) {
        return next();
      };
      return function() {
        return defaultHandler;
      };
    })(),
    injectRouteDescriptor: function(app, routeDesc) {
      return app[routeDesc.method](routeDesc.path, routeDesc.handler);
    },
    injectRouteDescriptors: function(app, descriptors) {
      return _.map(descriptors, function(descriptor) {
        return routeDescriptor.injectRouteDescriptor(app, descriptor);
      });
    }
  };

}).call(this);
