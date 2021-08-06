user.controller('homeController',function($scope,$location,$localStorage){
    if($localStorage.id == null){
        $location.path('/sign-in')
    }
    $scope.editUser = function(){
        $location.path('/edit-user')
    }
    $scope.signOut = function(){
        $localStorage.$reset();
        $location.path('/sign-in')
    }
})