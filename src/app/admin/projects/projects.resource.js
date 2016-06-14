(function () {
    'use strict';
    angular.module('tm.admin')
    .factory('Projects', Projects);

    function Projects ($resource) {
        return $resource(
            '/api/projects/:projectId',
            {projectId: '@_id'},
            {
                query: {
                    method: 'get',
                    url: '/api/public/projects',
                    isArray: true
                },
                get: {
                    url: '/api/public/projects/:projectId'
                }
            }
        );
    }
})();
