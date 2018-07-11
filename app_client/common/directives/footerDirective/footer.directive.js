angular
  .module('app')
  .directive('footerGeneric', footerGeneric);

function footerGeneric () {
	return {
		restrict: 'EA',
		template: require('./footerDirective.html')
	};
}