(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminAboutController', AdminAboutController);

    /** @ngInject */
    function AdminAboutController($http, toastr, languages, Page, aboutUs) {
        var vm = this;

        vm.save = save;
        vm.availableLanguages = languages;

        vm.aboutUs = new Page(aboutUs);

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.about_us) {
                return;
            }
            _.each(language.strings.about_us, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { about_us: strings };

        function save () {
            // STEP 1: Save the translations
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () { toastr.success('Translations saved'); })
                .catch(function () { toastr.error('Error saving translations'); });

            //STEP 2: Save the page component numbers
            vm.aboutUs.$update()
                .then(function () { toastr.success('About us page values saves successfully'); })
                .catch(function () { toastr.error('Error saving About us page values'); });
        }

    }
})();
