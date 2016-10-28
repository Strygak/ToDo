(function () {

	homeCtrl.$inject = ['$scope', '$uibModal', 'todoData'];

	function homeCtrl ($scope, $uibModal, todoData) {
        $scope.on = true;
        todoData.recordAll()
	      .success(function (data) {
	          $scope.data = { records: data };
              if ($scope.data.records[0]) {
		          $scope.on = false;
	          }
	          else {
		          $scope.message = "There is no records";
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
	        	$scope.on = false;
	        }); 
	    };

	    $scope.deleteTask = function (id) {
	    	todoData.deleteOne(id)
	    	  .success(function(data) {
	    	  	console.log(data);

	    	  	todoData.recordAll()
	              .success(function (data) {
	                $scope.data = { records: data };
                    if ($scope.data.records[0]) {
		              $scope.on = false;
	                }
	                else {
		              $scope.on = true;
	                }
	              })
	              .error(function (data) {
	      	        $scope.message = "There is no records";
	              });
	    	  })
	    	  .error(function(data) {
	    	  	console.log(data);
	    	  })
	    };
	};

    angular.module('app')
	   .controller('homeCtrl', homeCtrl);
})();