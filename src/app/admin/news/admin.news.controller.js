(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminNewsController', AdminNewsController);


    function AdminNewsController (news, toastr, _, languages, $http) {
        var vm = this;

        vm.viewTranslations = false;
        vm.availableLanguages = languages;
        vm.saveTranslations = saveTranslations;

        vm.translations = [
            { key: '', name: 'Title' },
            { key: '', name: 'View article' },
            { key: '', name: 'View news' }
        ]

        vm.remove = remove;
        vm.news = news;

        var strings = {};
        _.each(languages, function (language) {
            if (! language.strings || ! language.strings.news) {
                return;
            }
            _.each(language.strings.news, function (value, key) {
                if (!strings[key]) {
                    strings[key] = {};
                }
                strings[key][language.isoCode] = value;
            });
        });

        vm.strings = { news: strings };


        function remove (item) {
            item
            .$remove()
            .then(function success() {
                toastr.success('The item was removed');
            });
            var index = _.findIndex(vm.news, item);
            vm.news.splice(index, 1);
        }

        function saveTranslations() {
            $http.put('/api/language/put-strings', vm.strings)
                .then(function () {
                    toastr.success('Translations saved');
                    vm.viewTranslations = false;
                }).catch(function () {
                toastr.error('Error saving');
            });
        }

    }
})();
