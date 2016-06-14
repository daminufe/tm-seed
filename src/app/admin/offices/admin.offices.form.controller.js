(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminOfficesFormController', AdminOfficesFormController);

    function AdminOfficesFormController (Language, toastr, $state, languages, office, _) {
        var vm = this;
        vm.suggestSlug = suggestSlug;
        vm.save = save;
        vm.availableLanguages = languages;

        vm.office = office;
        vm.languageOptions = Language.query();

        function save (form) {
            if (form.$valid) {
                var promise;

                if (vm.office._id) {
                    promise = vm.office.$update();
                } else {
                    promise = vm.office.$save();
                }

                promise.then(
                    function success () {
                        toastr.success('Office saved successful');
                        $state.go('admin.office.index');
                    },
                    function error (response) {
                        var msg = 'Error creating office';
                        if (_.get(response, ['data', 'error', 'message'])) {
                            msg = response.data.error || response.data.message;
                        }
                        toastr.error(msg, 'Error');
                    }
                );
            }
        }

        function suggestSlug () {
            vm.project.slug = vm.project.title
                .toString()
                .toLowerCase()
                .split(/\&+/).join("-and-")
                .split(/[^a-z0-9]/).join("-")
                .split(/-+/).join("-")
                .trim('-');
        }
    }
})();
