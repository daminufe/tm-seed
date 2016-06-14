(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminTeamController', AdminTeamController);

    /** @ngInject */
    function AdminTeamController($http, Page, toastr, team, languages, _) {
        var vm = this;

        vm.availableLanguages = languages;
        vm.strings = {};
        vm.members = new Page(team);
        vm.save = save;

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.team) {
                return;
            }
            _.each(language.strings.team, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { team: strings };


        function save () {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () { toastr.success('Translations saved'); })
                .catch(function () { toastr.error('Error saving translations'); });

            //STEP 2: Save the page component numbers
            vm.members.$update()
                .then(function () { toastr.success('Offices page values saves successfully'); })
                .catch(function () { toastr.error('Error saving Offices page values'); });

        }
    }
})();
