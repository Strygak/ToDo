(function () {
	angular
	  .module('app')
	  .service('todoData', todoData);

	todoData.$inject = ['$http', 'authentication'];

	function todoData ($http, authentication) {

		var recordCreate = function (data) {
			return $http.post('api/record', data, {
	    		headers: {
                    Authorization: 'Bearer ' + authentication.getToken() 
	    		}
	    	});
		};

		var recordAll = function (data) {
			return $http.post('api/records', data);
		};

		var readOne = function (recordid) {
			return $http.get('api/record/' + recordid, {
	    		headers: {
                    Authorization: 'Bearer ' + authentication.getToken() 
	    		}
	    	});
		};

	    var updateOne = function (recordid, data) {
	    	return $http.put('api/record/' + recordid, data, {
	    		headers: {
                    Authorization: 'Bearer ' + authentication.getToken() 
	    		}
	    	});
	    };

	    var deleteOne = function (recordid) {
	    	return $http.delete('api/record/' + recordid, {
	    		headers: {
                    Authorization: 'Bearer ' + authentication.getToken() 
	    		}
	    	});
	    };

	    return {
		    recordCreate : recordCreate,
		    recordAll : recordAll,
		    readOne : readOne,
		    updateOne : updateOne,
		    deleteOne : deleteOne
	    };

	}
})();