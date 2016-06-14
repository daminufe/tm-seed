(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminProjectsFormController', AdminProjectsFormController);

    function AdminProjectsFormController (Language, toastr, $state, languages, project) {
        var vm = this;
        vm.suggestSlug = suggestSlug;
        vm.save = save;
        vm.availableLanguages = languages;
        vm.projectTypes = [
            {
                title: 'Onshore wind',
                icon: 'map-icon-wind',
                display: true
            },
            {
                title: 'Solar',
                icon: 'map-icon-solar',
                display: true
            },
            {
                title: 'Office',
                icon: 'map-icon-office',
                display: false
            },
            {
                title: 'Custom MW',
                icon: 'map-icon-mw',
                display: false,
                hasValue: true
            }
        ];

        vm.project = project;
        vm.languageOptions = Language.query();
        vm.defaultMWValue = 'xxx';

        function save (form) {
            if (form.$valid) {
                vm.project.$save().then(
                    function success () {
                        toastr.success('Project saved successful');
                        $state.go('admin.projects.index');
                    },
                    function error (response) {
                        var msg = 'Error creating project';
                        if (response && response.data && (response.data.error || response.data.message)) {
                            msg = response.data.error || response.data.message;
                        }
                        toastr.error(msg, 'Error');
                    }
                );
            }
        }

        function suggestSlug () {
            vm.project.slug = vm.project.title
                .toString()
                .toLowerCase()
                .split(/\&+/).join("-and-")
                .split(/[^a-z0-9]/).join("-")
                .split(/-+/).join("-")
                .trim('-');
        }
    }
})();
