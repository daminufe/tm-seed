(function () {
    'use strict';

    angular
        .module('tm.admin')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('admin.pages', {
                url: '/pages',
                templateUrl: 'app/admin/pages/admin.pages.html',
                controller: 'AdminPagesController',
                controllerAs: 'adminPages',
                data: {roles: ['admin']}
            })
        ;
    }
})();
