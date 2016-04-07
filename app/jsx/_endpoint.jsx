var endpoint = (function () {
    return {
        'develop': {
            '/rest/job': function () {
                return '/rest/data.json'
            },
            '/rest/job/status': function () {
                return '/rest/status.json'
            }
        },
        'production': {
            '/rest/job': function (param) {
                return '/rest/job/' + (param || '')
            },
            '/rest/job/status': function (param) {
                return '/rest/job/status/' + (param || '')
            }
        },
        'localhost': {
            '/rest/job': function (param) {
                return 'http://localhost:8080/job-portal-1.0-SNAPSHOT/rest/job/' + (param || '')
            },
            '/rest/job/status': function (param) {
                return 'http://localhost:8080/job-portal-1.0-SNAPSHOT/rest/job/status' + (param || '')
            }
        }
    };
})();