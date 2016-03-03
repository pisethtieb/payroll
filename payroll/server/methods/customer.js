Meteor.methods({
    payroll_customerById: function (id) {
        var data = Payroll.Collection.Customer.findOne(id);
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo)
                .url();
        }
        return data;
    }
});