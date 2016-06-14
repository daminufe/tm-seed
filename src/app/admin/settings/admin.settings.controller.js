(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminSettingsController', AdminSettingsController);

    /** @ngInject */
    function AdminSettingsController($http, toastr, languages, Settings, settings) {
        var vm = this;

        vm.availableLanguages = languages;
        vm.save = save;
        vm.settings = settings;

        function save () {
            Settings.save(vm.settings)
                .$promise
                .then(function () { toastr.success('Settings saved'); })
                .catch(function () { toastr.error('Error saving Settings'); });
        }
    }
})();
