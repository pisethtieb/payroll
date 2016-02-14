Package.describe({
    name: 'theara:id-generator',
    version: '0.1.8',
    // Brief, one-line summary of the package.
    summary: 'Generate id for collections',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.use('underscore');
    api.use('underscorestring:underscore.string@3.0.3');

    api.addFiles('id-generator.js');

    api.export('idGenerator');
});
