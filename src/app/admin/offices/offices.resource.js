(function () {
    'use strict';
    angular.module('tm.admin')
    .factory('Offices', Offices);

    function Offices ($resource) {
        return $resource(
            '/api/offices/:officeId',
            {officeId: '@_id'},
            {
                query: {
                    method: 'get',
                    url: '/api/public/offices',
                    isArray: true
                },
                get: {
                    url: '/api/public/offices/:officeId'
                },
                update: {
                    method: 'put'
                }
            }
        );
    }
})();
