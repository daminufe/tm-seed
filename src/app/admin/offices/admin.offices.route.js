(function () {
    'use strict';

    angular
        .module('tm.admin')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider


            .state('admin.offices', {
                url: '/offices',
                abstract: true,
                template: '<ui-view />'
            })

            .state('admin.offices.index', {
                url: '',
                templateUrl: 'app/admin/offices/admin.offices.html',
                controller: 'AdminOfficesController',
                controllerAs: 'adminOffices',
                data: {roles: ['admin']}
            })

            .state('admin.offices.create', {
                url: '/create',
                templateUrl: 'app/admin/offices/admin.offices.form.html',
                controller: 'AdminOfficesFormController',
                controllerAs: 'adminOfficesForm',
                data: {roles: ['admin']},
                resolve: {
                    office: function (Offices) {
                        return new Offices();
                    }
                }
            })

            .state('admin.offices.edit', {
                url: '/edit/:officeId',
                templateUrl: 'app/admin/offices/admin.offices.form.html',
                controller: 'AdminOfficesFormController',
                controllerAs: 'adminOfficesForm',
                data: {roles: ['admin']},
                resolve: {
                    office: function (Offices, $stateParams) {
                        return Offices.get({ officeId: $stateParams.officeId });
                    }
                }

            })
        ;
    }
})();
