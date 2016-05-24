
myApp.controller('overviewCtrl', function ($scope,$rootScope,bookingDetails,$timeout ,$location ) {
      
      
        
        $scope.userOption = "home";
        
        $scope.optionSelected = function(option){
          $scope.userOption = option;
        }
        
        
        $scope.$on('myCustomEvent', function (event, data) {
             $scope.optionSelected(data);
        });
        
        
        $scope.userDetails =    JSON.parse(localStorage.getItem("userDetails"));
        
        $scope.showLoader = false;
        
        $scope.logout = function(){
          
            $scope.showLoader = true;
            
            localStorage.removeItem("userDetails");
            
            $timeout(function() {
              $scope.showLoader = false;
              $location.path('/login');
            }, 1000);
          
        }
        
        //alert($rootScope.userDetails);
    
    
    }
);
