/**
 * Created by adrian on 26/04/15.
 */

farmapp.controller('HeaderNavCtrl', ['$scope', function( $scope ){

    'use strict';

    $scope.doNewOrder = function() {
        $cookies.remove('sale');

        window.location = "admin/admin_login";
    }

}]);
