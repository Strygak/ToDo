angular
  .module('app')
  .directive('footerGeneric', footerGeneric);

function footerGeneric () {
	return {
		restrict: 'EA',
		templateUrl: 'common/directives/footerDirective/footerDirective.html'
	};
}