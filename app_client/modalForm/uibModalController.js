(function () {

angular
  .module('app')
  .controller('modalCtrl', modalCtrl);

modalCtrl.$inject = ['$scope', '$uibModalInstance', 'todoData'];

function modalCtrl ($scope, $uibModalInstance, todoData) {
	$scope.formError = "";

	$scope.onSubmit = function () {

		if ($scope.formData.title.length > 17) {
		  	$scope.formError = 'more than 17 characters';
		  	return false;
		}
		else {
			todoData.recordCreate($scope.formData)
			  .success(function(data) {
	            $scope.close(data);
			  })
	          .error(function(data) {
	          	$scope.formError = "Please try again";
	          });
			return false;
		}
	};

	$scope.close = function (result) {
		$uibModalInstance.close(result);
	}

	$scope.cancel = function () { 
		$uibModalInstance.dismiss('cancel'); 
	}
};

})();