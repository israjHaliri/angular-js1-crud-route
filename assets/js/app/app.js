var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'pages/content.html', controller: 'contentController'}).
      otherwise({redirectTo: '/'});
}]);