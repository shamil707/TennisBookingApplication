myApp.controller('bookNowCtrl', function ($scope,$timeout,bookingDetails) {
      
       $scope.date =  new Date().toLocaleString();
       
       $scope.userDetails =    JSON.parse(localStorage.getItem("userDetails"));
       
       $scope.currentDate = new Date();
       
       $scope.maxDate = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth() , $scope.currentDate.getDate() + 5);
       
         
       $scope.bookingDetails = {};
       
       $scope.showLoader = false;
       
       
        if(typeof(Storage) !== "undefined") {
          
            $scope.bookingArray = [];
      
            if(localStorage.getItem("bookingRecords") != "undefined" && localStorage.getItem("bookingRecords") != null){
              
              $scope.bookingArray =  JSON.parse(localStorage.getItem("bookingRecords"));
              
            }
            else{
              
              $scope.bookingArray = [];
              
            }
            
        
        } else {
          
            alert("OOPS Something Went Wrong ...");
            
        }
       
       
     
        function loadData(){
            bookingDetails.getData().then(function (data) {
                 $scope.venueList =  data.venueList;
            });
        }
        
        loadData();
      
        
        //to get the unique id 
         $scope.getCurrentDateAndTime = function() {
          var date = new Date().toLocaleString();
          return date.replace(/\s/g, '');
        }
       
        $scope.updateCourtNumberList = function() {
          $scope.courtList = $scope.selectedVenue.courtList;
          $scope.bookingDetails.venue = $scope.selectedVenue.value;
          $scope.selectedCourtNumber= null;
          $scope.selectedTimeSlot  =null;
          $scope.bookingDetails.courtNumber =null;
          $scope.bookingDetails.time = null;
          
        }
      
        $scope.updateTimeList = function() {
          $scope.timeList = $scope.selectedCourtNumber.timeList;
          $scope.bookingDetails.courtNumber = $scope.selectedCourtNumber.courtnumber;
          $scope.bookingDetails.time = null;
          $scope.selectedTimeSlot  =null;
          
        }
        
        $scope.updateTimeSlot   = function(){
          $scope.bookingDetails.time  = $scope.selectedTimeSlot;
        }
      
      
        $scope.clearFields   = function(){
           $scope.selectedCourtNumber= null;
           $scope.selectedTimeSlot  =null;
           $scope.selectedVenue = null;
           $scope.timeList=[];
           $scope.courtList=[];
           $scope.bookingDetails = {};
        }
        
        $scope.isFormValid =  function(){
          var flag = true;
          if ($scope.bookingDetails){
             if ( $scope.bookingDetails.venue &&
                  $scope.bookingDetails.courtNumber &&
                  $scope.bookingDetails.time &&
                  $scope.bookingDetails.dateOfBooking) {
                      
                    flag = true;
                }
                
                else{
                  
                    flag = false;
                }
          }
          
          else{
            
            flag = false;
            
          }
          
          return flag;
        }
      
        $scope.isValid = function(){
            
            var flag = true;
            
            if ($scope.bookingArray.length == 0) {
                    flag = true;
                    return flag;
            }
            else{
              angular.forEach($scope.bookingArray, function(value, key) {
                  if (value.venue == $scope.bookingDetails.venue &&
                       value.courtNumber == $scope.bookingDetails.courtNumber &&
                       value.time == $scope.bookingDetails.time &&
                       new Date(value.dateOfBooking) - new Date($scope.bookingDetails.dateOfBooking) == 0) {
                      
                    flag = false
                  }
              });
            }
            
            return flag;
        }
      
        $scope.onSubmitBooking = function(){
            
            
            //convert to date format to string 
            var tempStringDate = $scope.bookingDetails.dateOfBooking.toString();
            
            $scope.bookingDetails.dateOfBooking = tempStringDate;
            
            $scope.showLoader = true;
            
            $scope.bookingDetails.uniqueBookID = $scope.userDetails.username + $scope.getCurrentDateAndTime();
            
            $scope.bookingDetails.email        = $scope.userDetails.username;
            
            var isFormValid = true;
              if ($scope.isFormValid()){
                if ($scope.isValid()) {
                    
                    
                    $scope.bookingArray.push($scope.bookingDetails);
                    
                    console.log($scope.bookingArray);
                    
                    $scope.clearFields();
                    
                    localStorage.setItem("bookingRecords", JSON.stringify($scope.bookingArray));
                    
                    $timeout(function() {
                      $scope.showLoader = false;
                      $scope.showBooked = true;
                      $scope.recordID   = $scope.bookingDetails.uniqueBookID;
                      $scope.messageTimeout();
                    }, 1000);
                }
                else{
                  
                   $timeout(function() {
                      
                      $scope.showLoader = false;
                      $scope.showError  = "It is already been booked ..";
                      $scope.messageTimeout()
                    }, 1000);
                  }
              }
              else{
                $scope.showLoader = false;
                $scope.showError  = "Please the check fields before your submit ..";
                $scope.messageTimeout();
              }
            }
        
        $scope.messageTimeout = function(){
           $timeout(function() {
              $scope.showBooked = false;
              $scope.showError  = "";
            }, 5000);
        }
        
        $scope.reset = function(){
           $scope.selectedCourtNumber= null;
           $scope.selectedTimeSlot  =null;
           $scope.selectedVenue = null;
           $scope.timeList=[];
           $scope.courtList=[];
           $scope.bookingDetails = {};
        }
   
        
    }
);
