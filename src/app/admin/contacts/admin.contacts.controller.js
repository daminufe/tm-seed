(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminContactsController', AdminContactsController);

    /** @ngInject */
    function AdminContactsController($http, toastr, languages, _) {
        var vm = this;

        vm.viewTranslations = true;
        vm.availableLanguages = languages;
        vm.strings = {};
        vm.save = save;
        vm.contacts = [
            { name: 'Vitor', email: 'vitor@eurus.nl', message: 'ahfisgasioufgusdagf usgfugsd afgoau sdg fou asgdfuo gasduofgu oasgfuoasgdf', created: Date.now()},
            { name: 'Vitor', email: 'vitor@eurus.nl', message: 'ahfisgasioufgusdagf usgfugsd afgoau sdg fou asgdfuo gasduofgu oasgfuoasgdf', created: Date.now()},
            { name: 'Vitor', email: 'vitor@eurus.nl', message: 'ahfisgasioufgusdagf usgfugsd afgoau sdg fou asgdfuo gasduofgu oasgfuoasgdf', created: Date.now()},
            { name: 'Vitor', email: 'vitor@eurus.nl', message: 'ahfisgasioufgusdagf usgfugsd afgoau sdg fou asgdfuo gasduofgu oasgfuoasgdf', created: Date.now()}
        ];

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.contacts) {
                return;
            }
            _.each(language.strings.contacts, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { contacts: strings };

        function save () {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () { toastr.success('Translations saved'); })
                .catch(function () { toastr.error('Error saving translations'); });
        }
    }
})();
