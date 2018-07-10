import angular from 'angular';
import 'jquery';
import 'popper.js';
import 'angular-route';
import 'bootstrap';
import 'angular-ui-bootstrap';
import 'less';
import './less/styles.less';

angular.module('app', ['ngRoute', 'ui.bootstrap']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
       .when('/', {
          template: require('./startPage/start.html'),
          controller: 'startCtrl',
          controllerAs: 'vm'
       })
       .when('/record/:recordid', {
       	  template: require('./recordDetail/recordDetail.html'),
       	  controller: 'recordCtrl',
          controllerAs: 'vm'
       })
       .when('/register', {
          template: require('./auth/register/register.html'),
          controller: 'registerCtrl',
          controllerAs: 'vm'
       })
       .when('/login', {
          template: require('./auth/login/login.html'),
          controller: 'loginCtrl',
          controllerAs: 'vm'
       })
       .when('/home', {
          template: require('./home/home.html'),
          controller: 'homeCtrl',
          controllerAs: 'vm'
       })
       .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}

angular
 .module('app')
 .config(['$routeProvider', '$locationProvider', config]);