updateCtrl.$inject = ['$scope', '$uibModalInstance', '$routeParams', 'todoData', 'recordData'];

function updateCtrl ($scope, $uibModalInstance, $routeParams, todoData, recordData) {
	$scope.recordData = recordData;

	$scope.onUpdate = function() {

		if ($scope.recordData.title.length > 17) {
			$scope.formError = 'more than 17 characters';
			return false;
		} else {
			todoData.updateOne($scope.recordData.recordid, $scope.recordData)
				.success(function(data) {
				    $scope.close(data);
				})
				.error(function(data) {
				    $scope.formError = "Please try again";
				});
			return false;
		}
	};

	$scope.close = function(result) {
		$uibModalInstance.close(result);
	};

	$scope.cancel = function() { 
		$uibModalInstance.dismiss('cancel'); 
	};
}

angular
	.module('app')
	.controller('updateCtrl', updateCtrl);