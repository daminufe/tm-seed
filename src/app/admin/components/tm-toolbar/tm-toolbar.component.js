(function () {
    'use strict';
    angular.module('tm.admin')
        .component('tmToolbar', {
            restrict: 'E',
            templateUrl: 'app/admin/components/tm-toolbar/tm-toolbar.html',
            controller: ToolbarController,
            controllerAs: 'toolbar',
            transclude: true
        });

    function ToolbarController () {
    }

})();
