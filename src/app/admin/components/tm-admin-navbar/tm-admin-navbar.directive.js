(function () {
    'use strict';
    angular.module('tm.admin')
        .directive('tmAdminNavbar', adminNavbar);

    function adminNavbar() {
        return {
            restrict: 'E',
            templateUrl: 'app/admin/components/tm-admin-navbar/tm-admin-navbar.html',
            controller: adminNavbar,
            controllerAs: 'vm'
        };

        function adminNavbar ($auth, $state) {
            var vm = this;
            vm.logout = logout;

            var payload = $auth.getPayload();
            vm.username = payload.name;
            vm.userId = payload.user;

            function logout () {
                $auth.logout();
                $state.go('auth.login');
            }
        }
    }

})();
