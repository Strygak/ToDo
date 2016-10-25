angular
  .module('app')
  .directive('pageHeader', pageHeader);

function pageHeader () {
	return {
		restrict: 'EA',
		templateUrl: 'directives/pageHeader/pageHeader.html'
	}
}