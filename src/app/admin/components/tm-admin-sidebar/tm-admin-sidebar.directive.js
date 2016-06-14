(function () {
  'use strict';
  angular.module('tm.admin')
  .directive('tmAdminSidebar', adminSidebar);

  function adminSidebar() {
    return {
        restrict: 'E',
        templateUrl: 'app/admin/components/tm-admin-sidebar/tm-admin-sidebar.html',
        bindAsController: true,
        controller: function ($state) {
            this.isHere = function (state) {
                return $state.current.name === state ? 'active' : '';

            }
        },
        controllerAs: 'sidebar'
    };
  }

})();
