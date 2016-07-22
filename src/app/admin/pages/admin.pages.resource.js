(function () {
    'use strict';
    angular.module('tm.admin')
        .factory('Language', Language);

    function Language ($resource) {
        return $resource(
            '/api/language/:languageId', {
                languageId: '@_id'
            }, {
                query: {method: 'get', isArray: true},
                update: {method: 'put'},
                publicList: {
                    method: 'get',
                    url:'/api/public/language',
                    isArray: true,
                    cache: true
                }
            }
        );
    }
})();
