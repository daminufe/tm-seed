(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminOfficesController', AdminOfficesController);

    /** @ngInject */
    function AdminOfficesController($http, Page, toastr, languages, _, Offices) {
        var vm = this;

        vm.availableLanguages = languages;
        vm.viewTranslations = false;
        vm.strings = {};
        vm.offices = Offices.query();
        vm.save = save;

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.offices) {
                return;
            }
            _.each(language.strings.offices, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { offices: strings };

        function save () {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () { toastr.success('Translations saved'); })
                .catch(function () { toastr.error('Error saving translations'); });

            //STEP 2: Save the page component numbers
            vm.offices.$update()
                .then(function () { toastr.success('Offices page values saves successfully'); })
                .catch(function () { toastr.error('Error saving Offices page values'); });

        }
    }
})();
