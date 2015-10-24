require.config({
	shim:{
		'underscore':{
			exports: '_'
		},
		'backbone':{
			deps:['underscore','jquery'],
			exports: 'Backbone'
		}
	},
	paths:{
		'jquery': 'lib/jquery-1.11.3.min',
		'backbone': 'lib/backbone',
		'underscore': 'lib/underscore.1.8.2',
		'u1':'utility/u1'
	}
});

require(['u1'],function (u1){
	var testInstance = new u1.testList();

	testInstance.fetch();
});