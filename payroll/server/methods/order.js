Meteor.methods({
    payroll_orderById: function (id) {
        var data = Payroll.Collection.Order.findOne(id);
        return data;
    }
});