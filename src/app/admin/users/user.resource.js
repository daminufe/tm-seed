(function () {
    'use strict';
    angular.module('tm.admin')
    .factory('User', User);

    function User ($resource) {
        return $resource(
            '/api/user/:userId',
            null,
            {
                query: {method: 'get', isArray: false}
            }
        );
    }
})();
