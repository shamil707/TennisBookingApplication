

myApp.controller('loginCtrl', ['$scope','$location','$timeout',function($scope,$location,$timeout) {
 
 $scope.userDetails ={};
 $scope.onLogin = function(){
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("userDetails", JSON.stringify($scope.userDetails));
        $scope.showLoader = true;
        $timeout(function() {
            $scope.showLoader = false;
            $location.path('/overview');
          }, 1000);
    } else {
        // Sorry! No Web Storage support..
    }
 }
}]);