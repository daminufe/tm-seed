(function () {
    'use strict';

    angular
        .module('eurus')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                abstract: true,
                url: '/',
                templateUrl: 'app/index.template.html'
            })

            .state('home.index', {
                url: '',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })

        ;
    }

})();
