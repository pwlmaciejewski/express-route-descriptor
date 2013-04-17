_ = require 'underscore'

module.exports = routeDescriptor = 
	createRouteDescriptors: (descriptors) ->
		_.map descriptors, routeDescriptor.createRouteDescriptor

	createRouteDescriptor: (desc) ->
		_.extend {}, routeDescriptor.getDefaultDescriptor(), desc

	getDefaultDescriptor: ->
		method: 'get' 
		path: '/'
		handler: routeDescriptor.getDefaultHandler()

	getDefaultHandler: do -> 
		defaultHandler = (req, res, next) -> next()
		return -> defaultHandler

	injectRouteDescriptor: (app, routeDesc) ->
		app[routeDesc.method] routeDesc.path, routeDesc.handler

	injectRouteDescriptors: (app, descriptors) ->
		_.map descriptors, (descriptor) ->
			routeDescriptor.injectRouteDescriptor app, descriptor