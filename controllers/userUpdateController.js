user.controller('userUpdateController',function($scope,$http,$localStorage,$location,$window){
    if($localStorage.id == null){
        $location.path('/sign-in')
    }
    $scope.signOut = function(){
        $localStorage.$reset();
        $location.path('/sign-in')
    }
    $scope.firstName = /^[a-zA-Z]{3,10}$/
    $scope.lastName = /^[a-zA-Z]{3,10}$/
    $scope.email = /^(.+)@(.+)$/
    $scope.phoneNumber=/^[0-9]{10}$/
    $scope.address1 = /^[a-zA-Z]{3,10}$/
    $scope.address2 = /^[a-zA-Z]{3,10}$/
    $scope.pinCode=/^[0-9]{6}$/
    $scope.password=/^[A-Za-z0-9]{5}$/
    $scope.countries = {
        'USA': {
            'Alabama': ['Montgomery', 'Birmingham'],
            'California': ['Sacramento', 'Fremont'],
        },
       'India': {
            'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Akola'],
            'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur'],
        },
        'Australia': {
            'New South Wales': ['Sydney'],
            'Victoria': ['Melbourne']
        }
    };

        var config = {
            params : {
                emailAddress:$localStorage.email,
                password : $localStorage.password
            }
        }
        
        $http.get('http://localhost:8080/User_v1/rest/users/user',config)
            .success(function(data,status){
                $scope.user = data;
                $scope.status = status;
                $scope.user.password = data.password;
                if($scope.user != ""){
                    console.log($scope.user)
                }
                else if($scope.status == 204){
                    console.log("Incorrect credentials")
                }
            })
      $scope.userUpdate = function(){
          var userData = {
            firstName : $scope.user.firstName,
            lastName : $scope.user.lastName,
           phoneNumber : $scope.user.phoneNumber,
            emailAddress : $scope.user.emailAddress,
            password : $scope.user.password,
            address1 : $scope.user.address1,
            address2 : $scope.user.address2,
            city : $scope.user.city,
            state : $scope.user.state,
            country : $scope.user.country,
           postalCode : $scope.user.postalCode
          }
          console.log($scope.user.uuid+"update")
          var config={
              params:{
                    emailAddress:$localStorage.email,
                    password : $localStorage.password              }
          }
          $http.put('http://localhost:8080/User_v1/rest/users/user',userData,config)
          .success(function(data){
              console.log(data)
              $window.alert("User has been updated successfully");
              $location.path('/home')
          })
      }
      $scope.cancelEdit=function(){
          $location.path('/home')
      }
        
})