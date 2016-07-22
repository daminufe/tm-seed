(function () {
    'use strict';

    angular
        .module('tm.admin')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('admin.settings', {
                url: '/settings',
                templateUrl: 'app/admin/settings/admin.settings.html',
                controller: 'AdminSettingsController',
                controllerAs: 'adminSettings',
                data: {roles: ['admin']},
                resolve: {
                    settings: function (Settings) {
                        return Settings.query();
                    }
                }
            })
        ;
    }
})();
