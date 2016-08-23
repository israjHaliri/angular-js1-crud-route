app.controller('contentController', function($scope, $http, $location, $routeParams) {

   var id = $routeParams.id;
   $scope.active_path = null;
   $scope.category = "save"; 


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

   $scope.loadData= function () {
      $http({
         url: 'http://localhost:8080/api/list_data',
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



   $scope.processData= function (param) {

      console.log("category=",param);

      if (param == "save") 
      {
         $scope.saveData();
      }
      else
      {
         $scope.updateData();
      }

   };


   $scope.saveData= function () {

      $http.post('http://localhost:8080/api/insert', {
         'username' : $scope.username,
         'password' : $scope.password, 
         'active' : $scope.active.value
      }).success(function (response){             
         console.log("response save =",response);
         $scope.loadData();
         $scope.clear();
      }, function myError(response) {
         console.log("response save =",response);
      });
   };

   $scope.updateData= function () {

      $http.put('http://localhost:8080/api/update', {
         'id' : $scope.id,
         'username' : $scope.username,
         'password' : $scope.password, 
         'active' : $scope.active.value
      }).success(function (response){             
         console.log("response save =",response);
         $scope.loadData();
         $scope.clear();
      }, function myError(response) {
         console.log("response save =",response);
      });
   };

   $scope.editData= function (param) {

      $http.get('http://localhost:8080/api/list_data/'+param).success(function(response) {
         $scope.id = response.data[0]["id"];
         $scope.username = response.data[0]["username"];
         $scope.password = response.data[0]["password"];  
         $scope.active = $scope.options[0];  
         $scope.category = "edit";      
      });

   };

   $scope.deleteData = function (param) {
      if(confirm("Are you sure to delete this data?")){
         $http.get("http://localhost:8080/api/delete/"+param).success(function(response){
            $scope.loadData();
         });
      }
   };

   $scope.clear= function (param) {

      $http.get('http://localhost:8080/api/list_data/'+param).success(function(response) {
         $scope.id = "";
         $scope.username = "";
         $scope.password = "";
         $scope.active = "";      
         $scope.category = "save";      
      });

   };

});