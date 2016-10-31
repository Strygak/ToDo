(function () {
	angular
	  .module('app')
	  .service('todoData', todoData);

	todoData.$inject = ['$http'];

	function todoData ($http) {

		var recordCreate = function (data) {
			return $http.post('api/record', data);
		};

		var recordAll = function () {
			return $http.get('api/records');
		};

		var readOne = function (recordid) {
			return $http.get('api/record/' + recordid);
		};

	    var updateOne = function (recordid, data) {
	    	return $http.put('api/record/' + recordid, data);
	    };

	    var deleteOne = function (recordid) {
	    	return $http.delete('api/record/' + recordid);
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