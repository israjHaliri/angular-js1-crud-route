app.controller('contentController', function($scope, $http, $location, $routeParams) {

   var id = $routeParams.id;
   $scope.active_path = null;


   $scope.options = [
   {
      name: 'Active',
      value: '1'
   }, 
   {
      name: 'Inactive',
      value: '0'
   }
   ];

   $scope.active = $scope.options[0];

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
         'active' : $scope.active.value
      }).success(function (response){             
         console.log("response save =",response);
         $scope.active_path = $location.path('/');
      }, function myError(response) {
         console.log("response save =",response);
      });
   };

   $scope.editDataUser= function () {

      $http.get('http://localhost:8080/listData2/'+id).success(function(response) {
         $scope.listData = response.data;

         $scope.id = response.data[0]["id"];
         // $scope.username = response.data[0]["username"];
         // $scope.password = response.data[0]["password"];
         
      });

   };

   $scope.deleteDataUser = function (param) {
      if(confirm("Are you sure to delete this data?")){
         $http.get("http://localhost:8080/delete/"+param).success(function(response){
            $scope.loadDataUser();
         });
      }
   };
});