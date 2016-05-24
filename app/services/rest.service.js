'use strict';
/* Services */

myApp.factory('bookingDetails', function($http, $q) {
    return {
        getData : function() {
            var defer=$q.defer();
            $http({method: 'GET', url: 'data/bookDetailsData.json'}).success(function(data) {
                defer.resolve(data);
            });
            return defer.promise;
        }

    }
});