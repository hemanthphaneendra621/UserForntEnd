user.controller('productsController',function($scope,$http,$localStorage,$location){
    if($localStorage.id == null){
        $location.path('/sign-in')
    }
    $scope.signOut = function(){
        $localStorage.$reset();
        $location.path('/sign-in')
    }
    $http.get('http://localhost:8080/User_v1/rest/users/products')
        .success(function(data){
            console.log(data)
            $scope.products = data;
        })
})