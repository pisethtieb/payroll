/***** Before */
Sample.Collection.Order.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-' + doc.customerId;
    doc._id = idGenerator.genWithPrefix(Sample.Collection.Order, prefix, 3);
});
//Sample.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
