(function() {
    angular
      .module('app')
      .service('authentication', authentication);
    
    authentication.$inject = ['$http', '$window'];

    function authentication ($http, $window) {

        var saveToken = function(token) {
        	$window.localStorage['todo-Token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['todo-Token'];

        };

        register = function(user) {
        	return $http.post('api/register', user).success(function(data) {
        		saveToken(data.token);
        	});
        };

        login = function(user) {
        	return $http.post('api/login', user).success(function(data) {
        		saveToken(data.token);
        	});
        };

        logout = function() {
        	$window.localStorage.removeItem('todo-Token');
        };

        var isLoggedIn = function() {
            var token = getToken();
            if (token){ 
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        return {
        	saveToken : saveToken,
        	getToken : getToken,
        	register : register,
        	login : login,
        	logout : logout,
        	currentUser : currentUser,
        	isLoggedIn : isLoggedIn
        }
    }

})();