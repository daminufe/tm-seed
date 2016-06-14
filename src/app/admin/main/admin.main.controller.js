(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminMainController', AdminMainController);

    /** @ngInject */
    function AdminMainController() {
        var vm = this;
        vm.model = {
            EN: 'English text',
            FR: 'French text'
        };
    }
})();
