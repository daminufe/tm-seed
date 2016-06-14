(function () {
    'use strict';
    angular.module('tm.admin')
    .directive('uploadImage', uploadImage);

    function uploadImage () {
        return {
            restrict: 'E',
            required: 'ngModel',
            scope: {
                image: '=ngModel',
                category: '@?'
            },
            templateUrl: 'app/admin/components/tm-image-upload/tm-image-upload.html',
            controller: uploadImageController,
            controllerAs: 'vm',
            bindToController: true
        };

        function uploadImageController (Upload, $http, toastr) {
            var vm = this;

            vm.upload = upload;
            vm.uploadFiles = uploadFiles;
            vm.remove = remove;

            function upload (file) {
                if (!file) {
                    return false;
                }

                // toastr.warning('Uploading file...');

                Upload.upload({
                    url: '/api/file-upload',
                    data: {file: file, category: vm.category}
                })
                .then(uploadSuccess)
                .catch(uploadError);

                function uploadError (response) {
                    var msg = 'Error trying to upload';
                    if (response && response.data && (response.data.error || response.data.message)) {
                        msg = response.data.error || response.data.message;
                    }
                    toastr.error(msg, 'Error');
                }

                function uploadSuccess (uploadSuccess) {
                    toastr.success('Image uploaded successfully');
                    vm.image = uploadSuccess.data.url;
                }
            }

            function uploadFiles (files) {
                if (files.length >0) {
                    vm.upload(files[0]);
                }
            }

            function remove () {
                $http.post('/api/file-remove/:path');
                vm.image = undefined;
            }
        }
    }
})();
