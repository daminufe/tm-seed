(function () {
    'use strict';

    angular
        .module('tm.admin')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider


            .state('admin.projects', {
                url: '/projects',
                abstract: true,
                template: '<ui-view />'
            })

            .state('admin.projects.index', {
                url: '',
                templateUrl: 'app/admin/projects/admin.projects.html',
                controller: 'AdminProjectsController',
                controllerAs: 'adminProjects',
                data: {roles: ['admin']}
            })

            .state('admin.projects.create', {
                url: '/create',
                templateUrl: 'app/admin/projects/admin.projects.form.html',
                controller: 'AdminProjectsFormController',
                controllerAs: 'adminProjectsForm',
                data: {roles: ['admin']},
                resolve: {
                    project: function (Projects) {
                        return new Projects();
                    }
                }
            })

            .state('admin.projects.edit', {
                url: '/edit/:projectId',
                templateUrl: 'app/admin/projects/admin.projects.form.html',
                controller: 'AdminProjectsFormController',
                controllerAs: 'adminProjectsForm',
                data: {roles: ['admin']},
                resolve: {
                    project: function (Projects, $stateParams) {
                        return Projects.get({projectId: $stateParams.projectId});
                    }
                }

            })
        ;
    }
})();
