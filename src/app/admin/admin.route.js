(function () {
    'use strict';

    angular
        .module('tm.admin')
        .config(routerConfig)
        .run(routerRun);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider

            .state('auth', {
                url: '/auth',
                abstract: true,
                templateUrl: 'app/admin/auth/auth.template.html'
            })

            .state('auth.login', {
                url: '/login',
                templateUrl: 'app/admin/auth/admin.auth.login.html',
                controller: 'AdminAuthLoginController',
                controllerAs: 'adminAuthLogin'
            })

            .state('auth.forgot', {
                url: '/forgot',
                templateUrl: 'app/admin/auth/admin.auth.forgot.html',
                controller: 'AdminAuthLoginController',
                controllerAs: 'adminAuthLogin'
            })

            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: 'app/admin/admin.template.html',
                data: {roles: ['admin']},
                resolve: {
                    languages: function (Language) {
                        return Language.query().$promise.then(function (languages) {
                            return languages;
                        });
                    }
                }
            })

            .state('admin.main', {
                url: '',
                templateUrl: 'app/admin/main/admin.main.html',
                controller: 'AdminMainController',
                controllerAs: 'adminMain',
                data: {roles: ['admin']}
            })

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

            .state('admin.languages', {
                url: '/languages',
                templateUrl: 'app/admin/languages/admin.languages.html',
                controller: 'AdminLanguagesController',
                controllerAs: 'adminLanguages'
            })

            .state('admin.change-password', {
                url: '/change-password',
                templateUrl: 'app/admin/change-password/admin.change-password.html',
                controller: 'AdminChangePasswordController',
                controllerAs: 'adminChangePassword',
                data: {roles: ['admin']}
            })

            .state('admin.user', {
                url: '/user',
                abstract: true,
                template: '<ui-view />',
                data: {roles: ['admin']}
            })

            .state('admin.user.index', {
                url: '',
                templateUrl: 'app/admin/users/admin.users.html',
                controller: 'AdminUsersController',
                controllerAs: 'adminUsers',
                data: {roles: ['admin']}
            })

            .state('admin.user.create', {
                url: '/create',
                templateUrl: 'app/admin/users/admin.user.create.html',
                controller: 'AdminUserCreateController',
                controllerAs: 'adminUserCreate',
                data: {roles: ['admin']}
            })

            .state('admin.user.edit', {
                url: '/:userId',
                templateUrl: 'app/admin/users/admin.users.html',
                controller: 'AdminUsersEditController',
                controllerAs: 'adminUsersEdit',
                data: {roles: ['admin']}
            })
            ;
    }

    /** @ngInject */
    function routerRun ($rootScope, $state, $auth) {
        var onStartDeregister = $rootScope.$on('$stateChangeStart', stateChangeStart);
        var onSuccessDeregister = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        $rootScope.$on('$destroy', function () {
            onStartDeregister();
            onSuccessDeregister();
        });

        function stateChangeStart (event, toState, toParams) {
            if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
                var allowed = false;
                var payload = $auth.getPayload();

                if (payload) {
                    toState.data.roles.forEach(function (role) {
                        if (payload && payload.roles && payload.roles.length && payload.roles.indexOf(role) !== -1) {
                            allowed = true;
                            return true;
                        }
                    });

                    if (payload.exp - (Date.now()/1000) <= 0) {
                        allowed = false;
                    }
                }

                if (!allowed) {
                    event.preventDefault();
                    $state.go('auth.login', {}, {
                        notify: false
                    }).then(function () {
                        $rootScope.$broadcast('$stateChangeSuccess', 'auth.login', {}, toState, toParams);
                    });
                }
            }
        }

        function stateChangeSuccess (event, toState, toParams, fromState, fromParams) {
            if (!fromState.data || !fromState.data.ignoreState) {
                $state.previous = {
                    state: fromState,
                    params: fromParams,
                    href: $state.href(fromState, fromParams)
                };
            }
        }
    }

})();
