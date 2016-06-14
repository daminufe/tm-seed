(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminUsersController', AdminUsersController);

    function AdminUsersController (User) {
        var vm = this;

        User.query().$promise.then(function (query) {
            vm.paginate = query;
        });
    }
})();
