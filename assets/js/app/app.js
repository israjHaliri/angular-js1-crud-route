var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'pages/list.html', controller: 'contentController'}).
      when('/add', {templateUrl: 'pages/add.html', controller: 'contentController'}).
      when('/edit/:id', {templateUrl: 'pages/edit.html', controller: 'contentController'}).
      otherwise({redirectTo: '/'});
}]);