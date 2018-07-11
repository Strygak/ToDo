angular
  .module('app')
  .directive('pageHeader', pageHeader);

function pageHeader () {
	return {
		restrict: 'EA',
		template: require('./pageHeader.html')
	}
}