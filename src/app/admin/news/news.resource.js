(function () {
    'use strict';
    angular.module('tm.admin')
    .factory('News', News);

    function News ($resource, _) {
        return $resource(
            '/api/news/:newsId',
            {newsId: '@_id'},
            {
                query: {
                    method: 'get',
                    url: '/api/public/news',
                    isArray: true,
                    transformResponse: function (data) {
                        var wrappedResult = angular.fromJson(data);
                        _.forEach(wrappedResult, function(item) {
                            item.date = new Date(item.date);
                            item.year = item.date.getFullYear();
                        });
                        return wrappedResult;
                    }
                },
                get: {
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        data.date = new Date(data.date);
                        data.year = data.date.getFullYear();
                        return data;
                    }
                },
                queryAdmin: {method: 'get', url: '/api/news', isArray: true},
                update: {method: 'put'}
            }
        );
    }
})();
