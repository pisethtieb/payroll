/***** Before */
Payroll.Collection.Employees.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Payroll.Collection.Employees, prefix, 6);
});
//Payroll.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
