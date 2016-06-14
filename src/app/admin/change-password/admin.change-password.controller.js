(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminChangePasswordController', AdminChangePasswordController);

    function AdminChangePasswordController ($http, toastr) {
        var vm = this;

        vm.submit = submit;
        vm.form = {};

        function submit () {
            try {
                if (vm.form.new !== vm.form.confirmation) {
                    throw 'New password and confirmation must be the same';
                }
            } catch (e) {
                toastr.error(e, 'Error');
            }
            $http.post(
                '/api/user/change-password',
                vm.form
            ).then(
                function success(response) {
                    toastr.success(response.data.message);
                    vm.form = {};
                },
                function error(response) {
                    var msg = 'Error updating password';
                    if (response && response.data && response.data.error) {
                        msg = response.data.error;
                    }
                    toastr.error(msg, 'Error');
                }
            );
        }
    }
})();
