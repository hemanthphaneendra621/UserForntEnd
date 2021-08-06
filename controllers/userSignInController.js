user.controller('userSignInController',function($scope,$location,$http,$localStorage,Fact){
    $scope.email = /^(.+)@(.+)$/
    $scope.value = Fact;
    $scope.storage = $localStorage.email
    $scope.userSignIn = function(){
        var config = {
            params : {
                emailAddress:$scope.user.email,
                password : $scope.user.password
            }
        }
        
        $http.get('http://localhost:8080/User_v1/rest/users/user',config)
            .success(function(data,status){
                $scope.user = data;
                $localStorage.email = data.emailAddress;
                $localStorage.id = data.uuid;
                $scope.status = status;
                if($scope.user != ""){
                    console.log($scope.user)
                    $location.path('/home')
                    $scope.errorMessage=""
                }
                else if($scope.status == 204){
                    console.log("Incorrect credentials")
                    $scope.errorMessage="Invalid Credentials"
                }
                $localStorage.password = $scope.user.password;
            })
            .error(function(data){
                $scope.errorMessage="Invalid Credentials"
            })
        
    }
    $scope.signUp = function(){
        $location.path('/sign-up')
    }
})
