(function () {
    'use strict';

    angular
        .module('tm.admin')
        .directive('languageCreate', LanguageCreate);

    /** @ngInject */
    function LanguageCreate() {
        return {
            templateUrl: 'app/admin/languages/add-language/language.create.html',
            controller: LanguageCreateController,
            controllerAs: 'languageCreate',
            scope: {
                language: '=',
                saveCallback: '&'
            },
            bindToController: true
        };

        function LanguageCreateController (toastr, $log) {
            var vm = this;
            vm.saveLanguage = saveLanguage;


            function saveLanguage() {
                var promise;
                if (vm.language._id) {
                    promise = vm.language.$update();
                } else {
                    promise = vm.language.$save();
                }

                promise.then(function (language) {
                    toastr.success('Language '+language.internationalName+ ' was saved successfully');
                    vm.saveCallback()();
                }).catch(function (err) {
                    $log.error(err);
                    toastr.error('Error saving the language');
                });
            }
        }
    }
})();
