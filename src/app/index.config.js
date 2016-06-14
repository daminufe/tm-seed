(function () {
    'use strict';

    angular
        .module('core')
        .config(config)
        .config(configMap)
        .config(configTranslation);

    /** @ngInject */
    function config($locationProvider, $logProvider, toastrConfig) {
        $locationProvider.html5Mode(true);

        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.progressBar = false;
    }

    function configTranslation ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'api/public/language/',
            suffix: '.json'
        });

        $translateProvider
            .useLocalStorage()
            .useSanitizeValueStrategy('escapeParameters')
            .registerAvailableLanguageKeys(['en', 'nl', 'pt'], {
                'en_US': 'en',
                'en_UK': 'en',
                'nl_BE': 'nl',
                'nl_NL': 'nl',
                'pt_BR': 'pt',
                'pt_PT': 'pt'
            })
            // .preferredLanguage('en');
            .determinePreferredLanguage();

    }

})();
