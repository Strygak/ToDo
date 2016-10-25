angular
  .module('app')
  .directive('footerGeneric', footerGeneric);

function footerGeneric () {
	return {
		restrict: 'EA',
		templateUrl: 'directives/footerDirective/footerDirective.html'
	};
}