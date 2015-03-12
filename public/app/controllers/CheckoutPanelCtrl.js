/**
 * Created by Adrian on 17/02/2015.
 */

farmapp.controller('CheckoutPanelCtrl', ['$scope', '$rootScope', '$log', '$cookies', '$http', '$location', function( $scope ,$rootScope ,$log ,$cookies, $http, $location ) {

    "use strict";

    $scope.shippingData = true;
    $scope.paymentMethod = false;
    $scope.orderSummary = false;

    $scope.shippingDataComplete = false;
    $scope.paymentMethodComplete = false;
    $scope.orderSummaryEnable = false;

    $scope.checkoutCurrentStep = "shippingData";

    var orderInCookie = $cookies.getObject("order");
    var shoppingcartInCookie = $cookies.getObject("shoppingcart");

    if( ((orderInCookie != undefined) && (shoppingcartInCookie != undefined)) && !orderInCookie.sended) {
            orderInCookie.shoppingcart = shoppingcartInCookie;
            $scope.order = orderInCookie;

            $scope.checkoutCurrentStep = orderInCookie.currentStep;
            updateOrder( orderInCookie );

            switchCheckoutPanelSection( $scope.checkoutCurrentStep );
    }else {
        $scope.order = {};
        if ( shoppingcartInCookie != undefined )
            $scope.order.shoppingcart = shoppingcartInCookie;
        else
            window.location = "/account/log_in";

        updateOrder( $scope.order );
    }

    $log.log($scope.order);

    function switchCheckoutPanelSection( panelSelection ) {

        switch (panelSelection) {
            case "shippingData":
                if(!$scope.shippingData) {
                    $scope.shippingData = true;
                    $scope.paymentMethod = false;
                    $scope.orderSummary = false;
                }
                break;
            case "paymentMethod":
                if(!$scope.paymentMethod) {
                    $scope.paymentMethod = true;
                    $scope.shippingData = false;
                    $scope.orderSummary = false;
                }
                break;
            case "orderSummary":
                if(!$scope.orderSummary) {
                    $scope.orderSummary = true;
                    $scope.paymentMethod = false;
                    $scope.shippingData = false;
                }
                break;
        }

    }

    $scope.openSection = function ( panelSelectionName ){
        switchCheckoutPanelSection( panelSelectionName )
    };

    $scope.stepCompleted = function ( newOrder, sectionName ) {
        switch ( sectionName ) {
            case "shippingData":
                newOrder.shippingData.status = true;
                newOrder.currentStep = "paymentMethod";
                $scope.shippingDataComplete = true;

                updateOrder( newOrder );
                switchCheckoutPanelSection( newOrder.currentStep );
            break;
            case "paymentMethod":
                newOrder.paymentMethod.status = true;
                newOrder.currentStep = "orderSummary";
                $scope.paymentMethodComplete = true;

                updateOrder( newOrder );
                switchCheckoutPanelSection( newOrder.currentStep );
            break;
            case "orderSummary":
                $scope.sendingOrder = true;
                var order = newOrder;

                $http.post("http://virtualfarma.com.co/checkout/create_order" , { data : order} )
                    .success(function(data, status, headers, config) {
                        newOrder.sended = true;
                        $scope.sendingOrder = false;

                        $cookies.remove('shoppingcart');
                        updateOrder( newOrder );
                    }).
                    error(function(data, status, headers, config) {
                        console.info(data + ":(");
                    });


            break;
        }
    };

    function updateOrder ( order ){
        $cookies.putObject("order", order);
    }

    $scope.changeUseAccountDataStatus = function(){

        updateOrder( $scope.order );

    }
}]);