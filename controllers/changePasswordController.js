user.controller('changePasswordController',function($scope,$localStorage,$location,$http,$window){
    $scope.newPassword=/^[A-Za-z0-9]{5,20}$/
    if($localStorage.id == null){
        $location.path('/sign-in')
    }
    $scope.signOut = function(){
        $localStorage.$reset();
        $location.path('/sign-in')
    }
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
    $scope.userChangePassword = function(){
        var userData = {
            firstName : $scope.user.firstName,
            lastName : $scope.user.lastName,
           phoneNumber : $scope.user.phoneNumber,
            emailAddress : $scope.user.emailAddress,
            password : $scope.user.newpassword,
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
              }
          }
          if($scope.user.oldPassword == $localStorage.password){
            $localStorage.password=$scope.user.newpassword
            $http.put('http://localhost:8080/User_v1/rest/users/password',userData,config)
            .success(function(data){
                console.log(data)
                $window.alert("Password has been changed successfully!!")
                $location.path('/home')
            })
          }
          else{
              $window.alert("Incorrect Password!!")
              $location.path('/change-password')
          }
          
    }
})
