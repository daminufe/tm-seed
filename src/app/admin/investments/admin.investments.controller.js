(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminInvestmentsController', AdminInvestmentsController);

    /** @ngInject */
    function AdminInvestmentsController($http, toastr, languages, _) {
        var vm = this;

        vm.availableLanguages = languages;

        vm.save = save;
        vm.sections = {
            section1: {
                title: 'Section 1',
                subtitle: 'subtitle1',
                formItems: [
                    { icon: 'briefcase' },
                    { icon: 'handshake' },
                    { icon: 'road' }
                ]
            },
            section2: {
                title: 'Section 2',
                subtitle: 'subtitle2',
                formItems: [
                    { icon: 'target' },
                    { icon: 'globe' },
                    { icon: 'money' },
                    { icon: 'equalizer' },
                    { icon: 'clock' }
                ]
            }
        };

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.investments) {
                return;
            }
            _.each(language.strings.investments, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { investments: strings };


        function save () {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () {
                    toastr.success('Translations saved');
                }).catch(function () {
                    toastr.error('Error saving translations');
                });
        }
    }
})();
