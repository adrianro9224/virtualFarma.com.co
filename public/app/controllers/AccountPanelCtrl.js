/**
 * Created by Adrian on 01/12/2014.
 */



farmapp.controller('AccountPanelCtrl', ['$scope', function($scope) {

    $scope.shippingData = true;
    $scope.paymentMethod = false;
    $scope.orderSummary = false;

    $scope.openSection = function ( panelSelection) {

        switch (panelSelection) {
            case 'myAccount':
                if(!$scope.shippingData) {
                    $scope.shippingData = true;
                    $scope.paymentMethod = false;
                    $scope.orderSummary = false;
                }
            break;
            case 'myPurchases':
                if(!$scope.paymentMethod) {
                    $scope.paymentMethod = true;
                    $scope.shippingData = false;
                    $scope.orderSummary = false;
                }
            break;
            case 'myDiagnostic':
                if(!$scope.orderSummary) {
                    $scope.orderSummary = true;
                    $scope.paymentMethod = false;
                    $scope.shippingData = false;
                }
            break;
        }

    }


}]);