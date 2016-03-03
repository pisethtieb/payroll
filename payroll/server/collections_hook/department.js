/***** Before */
Payroll.Collection.Departments.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Payroll.Collection.Departments, prefix, 6);
});
//Payroll.Collection.Departments.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
