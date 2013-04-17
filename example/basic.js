var routeDescriptor = require('../lib/route-descriptor');
var express = require('express');
var app = express();

var controller = {
	foo: function (req, res) {
		res.send(200);
	}
};

var descriptors = routeDescriptor.createRouteDescriptors([{
	path: '/foo',
	handler: controller.foo
}, {
	path: '*',
	method: 'all',
	handler: function (req, res) {
		res.send(404);
	}
}]);

routeDescriptor.injectRouteDescriptors(app, descriptors);

app.listen(3000);