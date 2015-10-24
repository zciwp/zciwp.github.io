define(['jquery','underscore','backbone'],function ($,_,Backbone){
	var testModel = Backbone.Model.extend({
		defaults:{
			name: '默认'
		}
	});

	var testList = Backbone.Collection.extend({
		model: testModel,
		url: '/test'
	});

	return {
		testModel: testModel,
		testList: testList
	}
});