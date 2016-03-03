/***** Before */
Payroll.Collection.Order.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-' + doc.customerId;
    doc._id = idGenerator.genWithPrefix(Payroll.Collection.Order, prefix, 3);
});
//Payroll.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
