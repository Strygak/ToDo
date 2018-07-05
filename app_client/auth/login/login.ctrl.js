(function() {
	angular
	  .module('app')
	  .controller('loginCtrl', loginCtrl);

	  loginCtrl.$inject = ['$location', 'authentication'];

	  function loginCtrl ($location, authentication) {
	  	var vm = this;

	  	vm.credentials = {
            email : '',
            password : ''
	  	};

        vm.onSubmit = function () {
        	vm.formError = "";

        	if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
            	vm.doLogin();
            }
        };

        vm.doLogin = function () {
        	vm.formError = "";

        	authentication
        	  .login(vm.credentials)
        	  .error(function(err) {
        	  	vm.formError = err;
        	  })
        	  .then(function() {
        	  	$location.path('/home');
        	  });
        }
	  }
})();