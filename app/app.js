'use strict';

// Declare app level module which depends on views, and components
var myApp =  angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'partials/overview.html',
    controller: 'overviewCtrl'
  }).when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  });
  
  $routeProvider.otherwise({
      redirectTo : '/login'
  });
  
}]).run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      
      $rootScope.loggedInUser =    JSON.parse(localStorage.getItem("userDetails"));
      if ($rootScope.loggedInUser) {
        // no logged user, redirect to /login
         $location.path("/overview");
      }
      else{
        $location.path("/login");
      }
      
      
      
    });
  });
