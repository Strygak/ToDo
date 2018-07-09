import angular from 'angular';
import 'jquery';
import 'popper.js';
import 'angular-route';
import 'bootstrap';
import 'angular-ui-bootstrap';
import 'less';
import './less/styles.less';

angular.module('app', ['ngRoute']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
       .when('/', {
          templateUrl: '/startPage/start.html'
       })
       .when('/record/:recordid', {
       	  templateUrl : '/recordDetail/recordDetail.view.html',
       	  controller : 'recordCtrl',
          controllerAs : 'vm'
       })
       .when('/register', {
          templateUrl : '/auth/register/register.view.html',
          controller : 'registerCtrl',
          controllerAs : 'vm'
       })
       .when('/login', {
          templateUrl : '/auth/login/login.view.html',
          controller : 'loginCtrl',
          controllerAs : 'vm'
       })
       .when('/home', {
          templateUrl : '/home/home.view.html',
          controller : 'homeCtrl',
          controllerAs : 'vm'
       })
       .otherwise({redirectTo : '/'});

    $locationProvider.html5Mode(true);
}

angular
 .module('app')
 .config(['$routeProvider', '$locationProvider', config]);