(function () {

angular
  .module('app')
  .controller('modalCtrl', modalCtrl);

modalCtrl.$inject = ['$scope', '$uibModalInstance', 'todoData'];

function modalCtrl ($scope, $uibModalInstance, todoData) {
	$scope.formError = "";

	$scope.onSubmit = function () {

		if ($scope.formData.title.length > 15) {
		  	$scope.formError = 'more than 15 characters';
		  	return false;
		}
		else {
			todoData.recordCreate($scope.formData)
			  .success(function(data) {
	            $scope.close();
			  })
	          .error(function(data) {
	          	$scope.formError = "Your review has not been saved, please try again";
	          });
			return false;
		}
	};

	$scope.close = function () {
		$uibModalInstance.close();
	}

	$scope.cancel = function () { 
		$uibModalInstance.dismiss('cancel'); 
	}
};

})();