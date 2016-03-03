// Publication
//Meteor.publish('payroll_customer', function (branchId) {
//    this.unblock();
//    if (this.userId) {
//        var selector = {};
//        if (!_.isUndefined(branchId)) {
//            selector.branchId = branchId;
//        }
//
//        return Payroll.Collection.Customer.find(selector, {removed: true});
//    }
//
//    this.ready();
//});

Meteor.publish('payroll_customerById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);

        return Payroll.Collection.Customer.find({_id: id});
    }

    this.ready();
});
