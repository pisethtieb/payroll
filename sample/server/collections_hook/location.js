/***** Before */
Sample.Collection.Location.before.insert(function (userId, doc) {
    console.log('before gen id:' + doc._id);
    doc._id = '0001';
    //doc._id = idGenerator.gen(Sample.Collection.Location, 4);
});
//Sample.Collection.Location.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
