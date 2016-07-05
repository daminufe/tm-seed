(function () {
    'use strict';

    angular.module('eurus')
        .filter('translateItem', translateItem);

    function translateItem ($translate) {
        return function (input) {
            var lang = $translate.use() || 'en';
            if (input && input[lang]) {
                return input[lang];
            }

            return input;
        }
    }
})();
