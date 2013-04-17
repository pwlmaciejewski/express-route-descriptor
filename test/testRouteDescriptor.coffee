buster = require 'buster'
routeDescriptor = require '../lib/route-descriptor'
sinon = require 'sinon'

buster.testCase 'RouteDescriptor',
	'test default descriptor handler': ->
		assert.same routeDescriptor.getDefaultDescriptor().handler, routeDescriptor.getDefaultHandler()

	'test create without arguments returns default descriptor': ->
		assert.equals routeDescriptor.createRouteDescriptor(), routeDescriptor.getDefaultDescriptor()

	'test create with arguments': ->
		assert.equals routeDescriptor.createRouteDescriptor({ path: 'xxx' }).path, 'xxx'

	'test createRouteDescriptors': ->
		desc = [
			path: 'xxx'
			method: 'post'
		]

		descriptors = routeDescriptor.createRouteDescriptors desc
		
		assert.equals descriptors[0], 
			path: 'xxx'
			method: 'post'
			handler: routeDescriptor.getDefaultHandler()

	'test injectRouteDescriptor': ->
		app =
			post: sinon.spy()
		routeDescriptor.injectRouteDescriptor app, routeDescriptor.createRouteDescriptor
			method: 'post'
			path: 'xxx'
		assert.calledWith app.post, 'xxx', routeDescriptor.getDefaultHandler()

	'test injectRouteDescriptors': ->
		app =
			post: sinon.spy()
		descriptors = [
			method: 'post'
		,
			method: 'post'
		]
		routeDescriptor.injectRouteDescriptors app, routeDescriptor.createRouteDescriptors(descriptors)
		assert.calledTwice app.post