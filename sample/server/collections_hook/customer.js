/***** Before */
Sample.Collection.Customer.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Sample.Collection.Customer, prefix, 6);
});
//Sample.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
