Package.describe({
    name: 'theara:select2',
    version: '4.0.2_2',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.use("jquery", "client");

    api.addFiles([
        'lib/select2-4/css/select2.css',
        'lib/select2-bootstrap.css',
        'lib/select2-4/js/select2.js'
    ], "client");
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:select2');
    api.addFiles('select2-tests.js');
});
