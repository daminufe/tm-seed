(function () {
    'use strict';

    angular
        .module('tm.admin')
        .controller('AdminLanguagesController', AdminLanguagesController);

    /** @ngInject */
    function AdminLanguagesController($state, Language, languages) {
        var vm = this;

        vm.languages = languages;
        vm.editing = false;
        vm.currentLanguage = new Language(); // Current language being added/edited
        vm.cancelEdit = cancelEdit;
        vm.editLanguage = editLanguage;
        vm.savedCallback = savedCallback;

        function cancelEdit () {
            vm.editing = false;
            vm.currentLanguage = new Language();
        }

        function editLanguage (language) {
            vm.currentLanguage = new Language(language);
            vm.editing = true;
        }

        function savedCallback() {
            vm.cancelEdit();
            $state.reload();
        }
    }
})();
