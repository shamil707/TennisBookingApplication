

myApp.controller('homeCtrl', ['$scope',function($scope) {
    $scope.redirectToBookNow   = function(){
      $scope.$emit('myCustomEvent', 'bookNow');
    }
}]);