(function () {

	homeCtrl.$inject = ['$location', '$uibModal', 'todoData', 'authentication'];

	function homeCtrl ($location, $uibModal, todoData, authentication) {
		var vm = this;
		vm.currentUser = authentication.currentUser();
        
        todoData.recordAll(vm.currentUser)
	      .success(function (data) {
	          vm.data = { records: data };
              if (vm.data.records[0]) {
		          vm.on = false;
	          }
	          else {
		          vm.on = true;
	          }
	      })
	      .error(function (data) {
	      	vm.formError = "No records";
	      });

	    vm.createTask = function () {
	        var modalInstance = $uibModal.open({
		        templateUrl : '/modalForm/modalForm.view.html',
		        controller : 'modalCtrl'
	        });  

	        modalInstance.result.then(function (data) {
	        	vm.data.records.push(data);
	        	vm.on = false;
	        }); 
	    };

	    vm.correctTask = function (id, title, desc) {
	    	
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
	        	todoData.recordAll(vm.currentUser)
	                  .success(function (data) {
	                    vm.data = { records: data };
                        if (vm.data.records[0]) {
		                  vm.on = false;
	                    }
	                    else {
		                  vm.on = true;
	                    }
	                  })
	                  .error(function (data) {
	      	            vm.message = "There is no records";
	                  });
	        });
	    };

	    vm.deleteTask = function (id) {
	    	todoData.deleteOne(id)
	    	  .success(function(data) {
	    	  	console.log(data);

	    	  	todoData.recordAll(vm.currentUser)
	              .success(function (data) {
	                vm.data = { records: data };
                    if (vm.data.records[0]) {
		              vm.on = false;
	                }
	                else {
		              vm.on = true;
	                }
	              })
	              .error(function (data) {
	      	        vm.message = "There is no records";
	              });
	    	  })
	    	  .error(function(data) {
	    	  	console.log(data);
	    	  })
	    };

	    vm.logout = function () {
		    authentication.logout();
		    $location.path('/');
	    };
	};

    angular.module('app')
	   .controller('homeCtrl', homeCtrl);
})();