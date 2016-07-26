(function () {
    'use strict';
    angular.module('tm.admin')
        .component('tmQuantityPanel', {
            restrict: 'E',
            templateUrl: 'app/admin/components/tm-quantity-panel/tm-quantity-panel.html',
            controller: QuantityPanelController,
            controllerAs: 'quantityPanel',
            transclude: true,
            bindings: {
                theme: '@',
                icon: '@',
                sref: '@',
                number: '@',
                headline: '@',
                buttonText: '@'
            }
        });

    function QuantityPanelController () {
        
    }

})();
