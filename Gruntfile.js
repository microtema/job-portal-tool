module.exports = function (grunt) {
    grunt.initConfig({
        execute: {
            target: {
                src: ['script/web-server.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('server', ['execute']);
};