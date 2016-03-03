// Publication
Meteor.publish('payroll_orderByCustomer', function (customerId) {
    this.unblock();
    if (this.userId) {
        check(customerId, String);
        return Payroll.Collection.Order.find({customerId: customerId}, {removed: true});
    }

    this.ready();
});

Meteor.publish('payroll_orderById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);
        return Payroll.Collection.Order.find({_id: id}, {removed: true});
    }

    this.ready();
});