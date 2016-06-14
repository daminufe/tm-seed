(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminAuthLoginController', AdminAuthLoginController);

    function AdminAuthLoginController (toastr, $auth, $state, $http) {
        var vm = this;

        vm.authenticate = authenticate;
        vm.forgot = forgot;

        vm.form = {
            grant_type: 'password'
        };

        function authenticate () {
            try {
                if (!vm.form.username || vm.form.username === '') {
                    throw 'Username is required';
                }
                if (!vm.form.password || vm.form.password === '') {
                    throw 'Password is required';
                }
                $auth.login(vm.form)
                .then(function success() {
                    if (['','admin.main','auth.login','auth.forgot'].indexOf($state.previous.state.name) > -1) {
                        $state.go('admin.main', $state.previous.params);
                    } else {
                        $state.go($state.previous.state.name, $state.previous.params);
                    }
                })
                .catch(function(response) {
                    var msg = 'Error on authenticate your user';
                    if (response && response.data && response.data.error) {
                        msg = response.data.error;
                    }
                    toastr.error(msg, 'Error');
                    vm.form.password = '';
                });
            } catch(e) {
                toastr.error(e);
            }
        }

        function forgot () {
            try {
                if (!vm.form.username || vm.form.username === '') {
                    throw 'Username is required';
                }
                toastr.warning('We are sending to your email the instructions. Please wait');
                $http.post(
                    '/api/recover-password', vm.form
                )
                .then(
                    function success (response) {
                        var msg = 'Follow the instructions sent to email ' + response.data.email;
                        toastr.success(msg);
                        $state.go('auth.login');
                    },
                    function error (response) {
                        var msg = 'Something went wrong';
                        if (response && response.data && response.data.error) {
                            msg = response.data.error;
                        }
                        toastr.error(msg, 'Error');
                    }
                );
            } catch(e) {
                toastr.error(e);
            }
        }
    }

})();
