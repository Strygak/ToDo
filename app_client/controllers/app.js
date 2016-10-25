var app = angular.module('app', ['ngRoute']);

app.controller('homeCtrl', function($scope, $compile, $element) {
	$scope.createTask = function() {
		var ul = $element.find('ul');
		console.log(ul);
	}
});