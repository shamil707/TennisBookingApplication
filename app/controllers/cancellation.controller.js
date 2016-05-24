myApp.controller('cancellationCtrl', ['$scope','$timeout',function($scope,$timeout) {
    

  $scope.userDetails =    JSON.parse(localStorage.getItem("userDetails"));
  
  $scope.emailID     =    $scope.userDetails.username
  
  function loadData(){
    
     $scope.showLoader = true;
     
    if(localStorage.getItem("bookingRecords") != "undefined" && localStorage.getItem("bookingRecords") != null){
        
        $scope.userBookingRecords =    JSON.parse(localStorage.getItem("bookingRecords"));
        
    }
    
    else{
        
        $scope.userBookingRecords = [];
    }
     
    $scope.showLoader = false;
    
    console.log(JSON.stringify($scope.userBookingRecords));
     
  }
  
  loadData();
  
  $scope.cancelBooking = function(bookingID){
    
    $scope.showLoader = true;
    if (bookingID) {
        
        var i = 0;
    
        for (i=0;i < $scope.userBookingRecords.length;i++){
           
            var index = 0;
            
            if ($scope.userBookingRecords[i].uniqueBookID  == bookingID) {
                 
                 break;
                
            }
        }
        
         $timeout(function() {
         
            $scope.userBookingRecords.splice(i,1);
            
            localStorage.setItem("bookingRecords", JSON.stringify($scope.userBookingRecords));
            
            $scope.showLoader = false;
         
         }, 1000);
    }
    else{
        
         var i = 0;
    
        for (i=0;i <  $scope.userBookingRecords.length;i++){
           
            var index = 0;
            
            if ($scope.userBookingRecords[i].email  == $scope.userDetails.username) {
                 
                 $scope.userBookingRecords.splice(i,1);
                
            }
        }
        
         $timeout(function() {
         
            
            
            localStorage.setItem("bookingRecords", JSON.stringify($scope.userBookingRecords));
            
            $scope.showLoader = false;
         
         }, 1000);
        
    }
   
    
   
    
    console.log(JSON.stringify($scope.userBookingRecords));
  }
 
}]);