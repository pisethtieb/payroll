/***** Before */
Payroll.Collection.Location.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Payroll.Collection.Location, 4);
});
//Payroll.Collection.Location.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
