(function () {
    'use strict';
    angular.module('tm.admin')
        .directive('tmMultilanguageInput', adminNavbar);

    function adminNavbar() {
        return {
            restrict: 'E',
            templateUrl: 'app/admin/components/tm-multilanguage-input/tm-multilanguage-input.html',
            controller: MultilanguageInputController,
            controllerAs: 'multilanguage',
            bindToController: true,
            scope: {
                model: '=',
                selected: '=?',
                rows: '=?',
                availableLanguages: '='
            }
        };

        function MultilanguageInputController (_) {
            var vm = this;
            vm.selectedLanguage = undefined;
            vm.selectLanguageCb = selectLanguageCb;

            if (!vm.availableLanguages) {
                throw 'You must pass available-languages attribute to the directive';
            }

            vm.selectedLanguage = _.find(vm.availableLanguages, { isoCode: 'en' });
            vm.selected = vm.selectedLanguage.isoCode;

            function selectLanguageCb () {
                vm.selected = vm.selectedLanguage.isoCode;
            }
        }
    }

})();
