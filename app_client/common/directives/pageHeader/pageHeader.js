angular
  .module('app')
  .directive('pageHeader', pageHeader);

function pageHeader () {
	return {
		restrict: 'EA',
		templateUrl: 'common/directives/pageHeader/pageHeader.html'
	}
}