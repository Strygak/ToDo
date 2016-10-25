(function () {

	homeCtrl.$inject = ['$scope', '$uibModal', 'todoData'];

	function homeCtrl ($scope, $uibModal, todoData) {

        todoData.recordAll()
	      .success(function (data) {
	          $scope.data = { records: data };
              if ($scope.data.records[0]) {
		          $scope.message = "";
	          }
	          else {
		          $scope.message = "No records";
	          }
	      })
	      .error(function (data) {
	      	$scope.formError = "No records";
	      });

	    $scope.createTask = function () {
	        var modalInstance = $uibModal.open({
		        templateUrl : '/modalForm/modalForm.view.html',
		        controller : 'modalCtrl'
	        });  

	        modalInstance.result.then(function (data) {
	        	$scope.data.records.push(data);
	        }); 
	    };

	    $scope.deleteTask = function () {};

	};

    angular.module('app')
	   .controller('homeCtrl', homeCtrl);
})();