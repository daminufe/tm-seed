(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminUserCreateController', AdminUserCreateController);

    function AdminUserCreateController (User, toastr, $state) {
        var vm = this;

        vm.save = save;

        vm.form = {
            roles: []
        };

        vm.availableRoles = ['user','admin'];

        function save (form) {
            if (form.$valid) {
                if (vm.form.password !== vm.form.passwordConfirmation) {
                    form.$invalid = true;
                    form.passwordConfirmation.$error.unmatch = true;
                } else {
                    form.passwordConfirmation.$error.unmatch = false;
                }
                var user = new User(vm.form);
                user.$save().then(
                    function success() {
                        toastr.success('User created sucessful');
                        $state.go('admin.user.index');
                    },
                    function error(response) {
                        var msg = 'Error creating user';
                        if (response && response.data && (response.data.error || response.data.message )) {
                            msg = response.data.error || response.data.message;
                        }
                        toastr.error(msg, 'Error');
                    }
                );
            }
        }
    }
})();
