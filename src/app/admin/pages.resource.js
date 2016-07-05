(function () {
    'use strict';

    angular.module('tm.admin')
        .factory('Page', Page);

    function Page ($resource) {
        return $resource(
            '/api/public/page/:name', {
                name: '@name'
            }, {
                query: {
                    method: 'get',
                    isArray: true
                },
                save: {
                    method: 'post',
                    url:'/api/page'
                },
                update: {
                    method: 'put',
                    url:'/api/page/:name'
                }
            }
        );
    }
})();
