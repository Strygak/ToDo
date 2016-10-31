(function () {

	homeCtrl.$inject = ['$scope', '$uibModal', 'todoData'];

	function homeCtrl ($scope, $uibModal, todoData) {
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

	    $scope.correctTask = function (id, title, desc) {
	    	
	    	var modalInstance = $uibModal.open({
	    		templateUrl : '/updateModalForm/updateModalForm.html',
	    		controller : 'updateCtrl',
	    		resolve : {
	    			recordData : function () {
                        return {
                    	    recordid : id,
                    	    title : title,
                    	    description : desc
                        };
                    }
	    		}
	    	});

	    	modalInstance.result.then(function (data) {
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