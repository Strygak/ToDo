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

	    var addRecord = function () {};

	    var deleteOne = function (data) {
	    	return $http.delete('api/record/:recordid');
	    };

	    return {
		    recordCreate: recordCreate,
		    recordAll: recordAll,
		    readOne: readOne,
		    deleteOne: deleteOne
	    };

	}
})();