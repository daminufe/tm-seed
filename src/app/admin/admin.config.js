(function () {
    'use strict';
    angular.module('tm.admin')
    .config(adminConfig);

    function adminConfig ($authProvider) {
        $authProvider.loginUrl = '/api/auth';
        $authProvider.tokenName = 'access_token';
    }

})();
