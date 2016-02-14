/***** Before */
Sample.Collection.Location.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Sample.Collection.Location, 4);
});
//Sample.Collection.Location.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
