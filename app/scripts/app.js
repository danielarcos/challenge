'use strict';

/**
 * @ngdoc overview
 * @name challenge2App
 * @description
 * # challenge2App
 *
 * Main module of the application.
 */
angular
  .module('challenge2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
