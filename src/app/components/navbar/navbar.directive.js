(function() {
  'use strict';

  angular
    .module('eurus')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
       controller: NavbarController,
       controllerAs: 'vm',
       bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(Language, $translate) {
        var vm = this;
        vm.selectLanguage = selectLanguage;
        vm.mobileVisible = false;
        vm.toggleMobileMenu = toggleMobileMenu;

        vm.languages = Language.publicList();
        vm.currentLang = $translate.use() || 'en';

        function selectLanguage (lang) {
            $translate.use(vm.currentLang = lang.isoCode.toLowerCase());
        }

        function toggleMobileMenu (status) {
            vm.mobileVisible = status;
        }
    }
  }

})();
