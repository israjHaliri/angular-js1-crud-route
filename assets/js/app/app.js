var app = angular.module('myApp', []);

app.controller('userController', function($scope, $http) {

   $scope.loadDataUser= function () {
      $http({
         url: 'http://localhost:8080/listData2',
         dataType: 'json',
         method: 'GET',
         data: '',
         headers: {
            "Content-Type": "application/json"
         }

      }).success(function(response){
         console.log("load response =",response);
         $scope.listData = response.data;
      }, function myError(response) {
         console.log("load error response =",response);
      });
   };

   $scope.processDataUser= function () {
      $http.post('http://localhost:8080/insert_model', {
         'id' : $scope.id,
         'username' : $scope.username,
         'password' : $scope.password, 
         'active' : $scope.active
      }).success(function (response){             
         console.log("response save =",response);
         $scope.loadData();
      }, function myError(response) {
         console.log("response save =",response);
         $scope.loadDataUser();
      });
   };

   $scope.processDataUser2= function () {
      var id = $scope.id;
      if (typeof($scope.id) == 'undefined') {
         var param = {
         "username" : $scope.username,
         "password" : $scope.password, 
         "active" : $scope.active
         }
      }
      else
      {
         var param = {
            "id" : id,
         "username" : $scope.username,
         "password" : $scope.password, 
         "active" : $scope.active
         }
      }

      $http({
         url: 'http://localhost:8080/insert_param',
         dataType: 'x-www-form-urlencoded',
         method: 'POST',
         data: param,
         headers: {
            "Content-Type": "application/x-www-form-urlencoded"
         },
         transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       }

    }).success(function (response){             
      console.log("response save =",response);
      $scope.loadDataUser();
   }, function myError(response) {
      console.log("response save =",response);
      $scope.loadDataUser();
   });
 };

 $scope.editDataUser= function (param) {
   $http({
      url: 'http://localhost:8080/listData2/'+param,
      dataType: 'json',
      method: 'GET',
      data: '',
      headers: {
         "Content-Type": "application/json"
      }
   }).success(function(response){
      console.log("load edit response =",response);
      $scope.listData = response.data;

      $scope.id = response.data[0]["id"];
      $scope.username = response.data[0]["username"];
      $scope.password = response.data[0]["password"];
      $scope.active = response.data[0]["active"];

   }, function myError(response) {
      console.log("load edit error response =",response);
   });
};

$scope.deleteDataUser = function (param) {
   if(confirm("Are you sure to delete this data?")){
      $http.get("http://localhost:8080/delete/"+param).success(function(response){
         console.log("delete response =",response);
         $scope.loadDataUser();
      });
   }
};
});