# Express-route-descriptor [![Build Status](https://travis-ci.org/fragphace/express-route-descriptor.png)](https://travis-ci.org/fragphace/express-route-descriptor)

Allows you to represent a route as an object and gives you a methods 
to easily inject it into Express.js router.

## Installation

	npm install express-route-descriptor


## Example

``` javascript
var routeDescriptor = require('express-route-descriptor');
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
```

Go to http://localhost:3000/foo and http://localhost:3000/bar to see that it works.

## Tests

	grunt test