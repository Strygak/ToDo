angular.module('app', ['ngRoute', 'ui.bootstrap']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
       .when('/', {
           templateUrl: '/home/home.html',
           controller: 'homeCtrl'
       })
       .when('/record/:recordid', {
       	  templateUrl: 'recordDetail/recordDetail.view.html',
       	  controller: 'recordCtrl',
          controllerAs: 'vm'
       })
       .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}

angular
 .module('app')
 .config(['$routeProvider', '$locationProvider', config]);