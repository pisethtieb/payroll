var Busboy, Backup, Restore;

Backup = Npm.require('mongodb-backup');
Restore = Npm.require('mongodb-restore');
Busboy = Npm.require("busboy");

Router.map(function () {
    return this.route('backupRestoreHTTP', {
        path: '/backupRestore',
        where: 'server',
        action: function () {
            var filename, req, res, token, userToken;
            req = this.request;
            res = this.response;

            /**
             * Backup
             */
            if (req.method === 'GET') {
                var backupOptions = {
                    uri: process.env.MONGO_URL,
                    tar: 'dump.tar',
                    parser: 'bson' // bson | json
                };

                // Check token
                token = req.query.token || '';
                check(token, String);
                userToken = Meteor.users.findOne({
                    "services.resume.loginTokens.hashedToken": Accounts._hashLoginToken(token)
                });
                if (!userToken) {
                    res.statusCode = 401;
                    return res.end(JSON.stringify({backup: "Unauthorized"}));
                }

                // Check collections
                if (req.query.collections) {
                    check(req.query.collections, String);
                    let collections = req.query.collections.split(',').map(function (col) {
                        return col.trim();
                    });
                    if (collections.length > 0) {
                        backupOptions.collections = collections;
                    }
                }

                // Check query
                if (req.query.query) {
                    check(req.query.query, String);
                    try {
                        backupOptions.query = JSON.parse(req.query.query);
                    } catch (_error) {
                        res.statusCode = 401;
                        return res.end(JSON.stringify({backup: "Failed to parse JSON Query"}));
                    }
                }

                // File name
                filename = req.query.filename + "_" + moment().format("YYMMDDHHmmss") + ".tar";

                res.statusCode = 200;
                res.setHeader('Content-disposition', "attachment; filename=" + filename);
                backupOptions.stream = res;

                Backup(backupOptions);
            }

            /**
             * Restore
             */
            if (req.method === 'POST') {
                var busboy = new Busboy({headers: req.headers});
                var restoreOptions = {
                    uri: process.env.MONGO_URL,
                    parser: 'bson', // bson | json
                    dropCollections: false
                };
                var dropCollections = false, dropQuery = {};

                // Field
                busboy.on('field', Meteor.bindEnvironment(function (fieldname, val, fieldnameTruncated, valTruncated) {
                    console.log('filed-----------');
                    // Check token
                    if (fieldname === 'token') {
                        console.log('token: ' + val);
                        token = val || '';
                        check(token, String);
                        userToken = Meteor.users.findOne({
                            "services.resume.loginTokens.hashedToken": Accounts._hashLoginToken(token)
                        });
                        if (!userToken) {
                            res.statusCode = 401;
                            return res.end(JSON.stringify({backup: "Unauthorized"}));
                        }
                    }

                    // Check drop collections
                    if (fieldname === 'dropCollections') {
                        console.log('dropCollections: ' + val);
                        val = val || 'false';
                        check(val, String);
                        if (val == 'false') {
                            dropCollections = false;
                        } else if (val == 'true') {
                            dropCollections = true;
                        } else {
                            dropCollections = val.split(',').map(function (col) {
                                return col.trim();
                            });
                        }
                    }

                    // Check drop query
                    if (fieldname === 'dropQuery') {
                        console.log('dropQuery: ' + val);
                        val = val || '{}';
                        check(val, String);
                        try {
                            dropQuery = JSON.parse(val);
                        } catch (_error) {
                            res.statusCode = 401;
                            return res.end(JSON.stringify({backup: "Failed to parse JSON Query"}));
                        }
                    }
                }));

                busboy.on('file', Meteor.bindEnvironment(function (fieldname, file, filename, encoding, mimetype) {
                    console.log('file---------------');
                    /***** Check drop collections and query *****/
                    if (_.isArray(dropCollections)) {
                        if (_.isEmpty(dropQuery)) {
                            restoreOptions.dropCollections = dropCollections;
                        } else {
                            console.log('Drop collection before restoring by manual');
                            dropCollectionsManual(dropCollections, dropQuery);
                        }
                    } else {
                        restoreOptions.dropCollections = dropCollections;
                    }
                    /****** --Check drop collections and query-- *****/

                    restoreOptions.stream = file;
                    restoreOptions.callback = function () {
                        return res.end(JSON.stringify({restore: restoreOptions}));
                    };

                    Restore(restoreOptions);
                }));

                return req.pipe(busboy);
            }
        }
    });
});


var dropCollectionsManual = function (collections, query) {
    _.each(collections, function (col) {
        Mongo.Collection.get(col).direct.remove(query, function (error) {
            if (error) {
                console.log('... is error (' + col + '): ' + error);
                return false;
            }
        });
    });

    console.log('... is success');
    return true;
};
