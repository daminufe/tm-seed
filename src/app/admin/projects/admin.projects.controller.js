(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminProjectsController', AdminProjectsController);

    function AdminProjectsController (Projects, languages, toastr, $http) {
        var vm = this;
        vm.viewTranslations = false;
        vm.availableLanguages = languages;
        vm.projects = Projects.query();
        vm.saveTranslations = saveTranslations;
        vm.remove = remove;

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.projects) {
                return;
            }
            _.each(language.strings.projects, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { projects: strings };

        function saveTranslations() {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () {
                    toastr.success('Translations saved');
                    vm.viewTranslations = false;
                }).catch(function () {
                toastr.error('Error saving');
            });
        }

        function remove (item) {
            item
            .$remove()
            .then(function success() {
                toastr.success('The item was removed');
            });
            var index = _.findIndex(vm.projects, item);
            vm.projects.splice(index, 1);
        }

    }
})();
