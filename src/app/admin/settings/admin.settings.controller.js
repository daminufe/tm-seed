(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminSettingsController', AdminSettingsController);

    /** @ngInject */
    function AdminSettingsController($http, toastr, languages, Settings, settings) {
        var vm = this;

        vm.availableLanguages = languages;
        vm.settings = new Settings(settings);

        // Functions
        vm.save = save;

        function save () {
            vm.settings.$save()
                .then(function () { toastr.success('Settings saved'); })
                .catch(function () { toastr.error('Error saving Settings'); });
        }
    }
})();
