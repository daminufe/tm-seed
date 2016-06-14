(function () {
    'use strict';
    angular.module('tm.admin')
    .controller('AdminNewsFormController', AdminNewsFormController);

    function AdminNewsFormController (News, Language, toastr, $state) {
        var vm = this;
        vm.suggestSlug = suggestSlug;
        vm.save = save;

        if ($state.params.newsId) {
            vm.news = News.get({ newsId: $state.params.newsId }, function (news) {
                vm.news.date = new Date(news.date);
            });
        } else {
            vm.news = new News({
                date: new Date()
            });
        }
        vm.languageOptions = Language.query();

        function save (form) {
            if (form.$valid) {
                if (!vm.news.text || vm.news.text === '') {
                    toastr.error('Content is required');
                    return false;
                }

                var promise;

                if (vm.news._id) {
                    promise = vm.news.$update();
                } else {
                    promise = vm.news.$save();
                }

                promise.then(
                    function success () {
                        toastr.success('News saved successful');
                        $state.go('admin.news.index');
                    },
                    function error (response) {
                        var msg = 'Error saving news';
                        if (response && response.data && (response.data.error || response.data.message)) {
                            msg = response.data.error || response.data.message;
                        }
                        toastr.error(msg, 'Error');
                    }
                );
            }
        }

        function suggestSlug () {
            vm.news.slug = vm.news.title
                .toString()
                .toLowerCase()
                .split(/\&+/).join("-and-")
                .split(/[^a-z0-9]/).join("-")
                .split(/-+/).join("-")
                .trim('-');
        }
    }
})();
