var user = angular.module("UserApp",['ngRoute','ngAnimate','ngStorage']);

user.factory('Fact', function() {
    return {
        name: ''
    };
});

user.config(function($routeProvider){
    $routeProvider
        .when('/sign-in',{
            templateUrl:'views/sign-in.html',
            controller:'userSignInController'
        })
        .when('/home',{
            templateUrl:'views/home.html',
            controller:'homeController'
        })
        .when('/sign-up',{
            templateUrl:'views/sign-up.html',
            controller:'userSignUpController'
        })
        .when('/edit-user',{
            templateUrl:'views/edit-user.html',
            controller:'userUpdateController'
        })
        .when('/change-password',{
            templateUrl:'views/changePassword.html',
            controller:'changePasswordController'
        })
        .when('/products',{
            templateUrl:'views/products.html',
            controller:'productsController'
        })
        .when('/orders',{
            templateUrl:'views/orders.html'
        })
        .otherwise({
            redirectTo:"/sign-in"
        })
})

user.directive("compareTo", function (){  
    return {  
        require: "ngModel",  
        scope:  
        {  
            confirmPassword: "=compareTo"  
        },  
        link: function (scope, element, attributes, modelVal)  
        {  
            modelVal.$validators.compareTo = function (val)  
            {  
                return val == scope.confirmPassword;  
            };  
            scope.$watch("confirmPassword", function ()  
            {  
                modelVal.$validate();  
            });  
        }  
    };  
});