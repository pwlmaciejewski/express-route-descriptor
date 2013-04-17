(function() {
  var buster, routeDescriptor, sinon;

  buster = require('buster');

  routeDescriptor = require('../lib/route-descriptor');

  sinon = require('sinon');

  buster.testCase('RouteDescriptor', {
    'test default descriptor handler': function() {
      return assert.same(routeDescriptor.getDefaultDescriptor().handler, routeDescriptor.getDefaultHandler());
    },
    'test create without arguments returns default descriptor': function() {
      return assert.equals(routeDescriptor.createRouteDescriptor(), routeDescriptor.getDefaultDescriptor());
    },
    'test create with arguments': function() {
      return assert.equals(routeDescriptor.createRouteDescriptor({
        path: 'xxx'
      }).path, 'xxx');
    },
    'test createRouteDescriptors': function() {
      var desc, descriptors;

      desc = [
        {
          path: 'xxx',
          method: 'post'
        }
      ];
      descriptors = routeDescriptor.createRouteDescriptors(desc);
      return assert.equals(descriptors[0], {
        path: 'xxx',
        method: 'post',
        handler: routeDescriptor.getDefaultHandler()
      });
    },
    'test injectRouteDescriptor': function() {
      var app;

      app = {
        post: sinon.spy()
      };
      routeDescriptor.injectRouteDescriptor(app, routeDescriptor.createRouteDescriptor({
        method: 'post',
        path: 'xxx'
      }));
      return assert.calledWith(app.post, 'xxx', routeDescriptor.getDefaultHandler());
    },
    'test injectRouteDescriptors': function() {
      var app, descriptors;

      app = {
        post: sinon.spy()
      };
      descriptors = [
        {
          method: 'post'
        }, {
          method: 'post'
        }
      ];
      routeDescriptor.injectRouteDescriptors(app, routeDescriptor.createRouteDescriptors(descriptors));
      return assert.calledTwice(app.post);
    }
  });

}).call(this);
