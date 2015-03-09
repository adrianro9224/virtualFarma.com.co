/**
 * Created by Adrian on 12/02/2015.
 */

farmapp.controller( 'ProductListCtrl', ['$scope' ,'$log' ,'$rootScope' ,'$cookies' ,'ConstantsService' ,function( $scope ,$log ,$rootScope ,$cookies, ConstantsService ){

    'use strict';

    var shoppingCartInCookie = $cookies.getObject( 'shoppingcart' );

    if( shoppingCartInCookie != undefined )
        $scope.shoppingcart = shoppingCartInCookie;


    $scope.addToShoppingCart = function( productId, name, PLU, barcode, categoryId, presentation, cant, price, discount, tax ) {

        var quantity = parseInt(cant ,10);

        if( ($scope.shoppingcart == undefined) ) {

            $scope.shoppingcart = {};
            $scope.shoppingcart.products = [{}];
            $scope.shoppingcart.subtotal = 0;
            $scope.shoppingcart.shippingCharge = 0;
            $scope.shoppingcart.tax = 0;
            $scope.shoppingcart.total = 0;
            $scope.shoppingcart.numOfproductsSubtotal = 0;
            $scope.shoppingcart.numOfproductsTotal = 0;
            $scope.shoppingcart.limitOrderValueInvalid = false;

            var firtsProduct = _chargeProductObject( productId, name, PLU, barcode, categoryId, presentation, quantity, price, discount, tax );

            $scope.shoppingcart.products[$scope.shoppingcart.numOfproductsSubtotal] = firtsProduct;
            $scope.shoppingcart.numOfproductsSubtotal++;
            $scope.shoppingcart.numOfproductsTotal++;
            $scope.shoppingcart.status = ConstantsService.SHOPPINGCART_WITH_PRODUCTS();

        } else {
            if ( ($scope.shoppingcart != undefined) && ($scope.shoppingcart.products != undefined) ) {

                var currentProduct = _chargeProductObject( productId, name, PLU, barcode, categoryId, presentation, quantity, price, discount, tax );

                var products = $scope.shoppingcart.products;
                var quantityProductIncreased = false;

                angular.forEach( products, function( product ,key ) {
                    if( product != undefined ){
                        if( (productId == product.id) && (PLU == product.PLU) ) {
                            quantityProductIncreased = true;
                            $scope.shoppingcart.products[key].cant += quantity;
                            $scope.shoppingcart.numOfproductsTotal += quantity;
                        }

                    }
                });

                if( !quantityProductIncreased ) {
                        $scope.shoppingcart.products[$scope.shoppingcart.numOfproductsSubtotal] = currentProduct;
                        $scope.shoppingcart.numOfproductsSubtotal++;
                        $scope.shoppingcart.numOfproductsTotal++;
                 }

            }
        }

        $rootScope.$broadcast( ConstantsService.SHOPPINGCART_INITIALIZED() , $scope.shoppingcart );

    };

    function _chargeProductObject( productId, name, PLU, barcode, categoryId, presentation, cant, price, discount, tax ) {

        var priceUnit =  parseFloat( price );
        var discount = parseInt( discount );
        var taxUnit = parseFloat( tax );

        var currentProduct = new Object();

        currentProduct.id = productId;
        currentProduct.PLU = PLU;
        currentProduct.name = name;
        currentProduct.barcode = barcode;
        currentProduct.categoryId = categoryId;
        currentProduct.presentation = presentation;
        currentProduct.cant = cant;
        currentProduct.tax = taxUnit == 0 ? 0 : taxUnit;
        currentProduct.price = priceUnit;
        currentProduct.discount = discount == 0 ? 0 : discount;

        return currentProduct;
    }

}]);
