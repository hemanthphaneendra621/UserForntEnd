user.controller('userSignUpController', function($scope,$http,$location,$window) {
    $scope.firstName = /^[a-zA-Z]{3,20}$/
    $scope.lastName = /^[a-zA-Z]{3,20}$/
    $scope.email = /^(.+)@(.+)$/
    $scope.phoneNumber=/^[0-9]{10}$/
    $scope.address1 = /^[a-zA-Z]{3,10}$/
    $scope.address2 = /^[a-zA-Z]{3,10}$/
    $scope.pinCode=/^[0-9]{6}$/
    $scope.password=/^[A-Za-z0-9]{5,20}$/
 
     $scope.userreset = function(){
         $scope.user.firstName="",
         $scope.user.lastName="",
         $scope.user.phoneNumber="",
         $scope.user.email="",
         $scope.user.password="",
         $scope.user.address1="",
         $scope.user.address2="",
         $scope.user.city="",
         $scope.user.state="",
         $scope.user.country="",
         $scope.user.pinCode="",
         $scope.user.confirmPassword=""
     }
     $scope.signIn=function(){
         $location.path('/sign-in')
     }
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
   
             $scope.GetSelectedCountry = function () {
                 $scope.count = $scope.user.country;
               };
             $scope.GetSelectedState = function () {
                   $scope.srcState = document.getElementById("state").value;
               };
             $scope.GetSelectedcity = function () {
                   $scope.City = $scope.user.city;
               };
     $scope.userSignUp = function(){
             
            var config = {
             params : {
                 emailAddress:$scope.user.email,
             }
         }
         $http.get('http://localhost:8080/User_v1/rest/users/email',config)
             .success(function(data,status){
                 if(status!=200){
                     var data= { firstName : $scope.user.firstName,
                         lastName : $scope.user.lastName,
                        phoneNumber : $scope.user.phoneNumber,
                         emailAddress : $scope.user.email,
                         password : $scope.user.password,
                         address1 : $scope.user.address1,
                         address2 : $scope.user.address2,
                         city : $scope.user.city,
                         state : $scope.user.state,
                         country : $scope.user.country,
                        postalCode : $scope.user.pinCode
           }
                     $http.post('http://localhost:8080/User_v1/rest/users/user',data)
                     .then(function(response,status){
                         console.log(response)
                         if(response.status == 200){
                          $window.alert("User is added .Please login to visit the website!!")
                             $location.path('/sign-in')
                         }
                     })
                 }
                 else{
                     $window.alert("User with the email already exists!!")
                     $location.path('/sign-up')
                 }
             })
            
     }
 });