(function () {
    'use strict';
    angular.module('tm.admin')
    .service('Settings', Settings);

    function Settings ($resource) {
        return $resource(
            '/api/settings', {}, {
                queryPublic: { method: 'get', url: '/api/public/settings', isArray: true },
                save: { method: 'put', isArray: true }
            }
        );
    }
})();
