// Publication
//Meteor.publish('payroll_location', function () {
//    this.unblock();
//    if (this.userId) {
//
//        return Payroll.Collection.Location.find({});
//        //return Payroll.Collection.Location.find({}, {removed: true}); // for soft remove
//    }
//
//    this.ready();
//});

Meteor.publish('payroll_locationById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);

        return Payroll.Collection.Location.find({_id: id});
        //return Payroll.Collection.Location.find({}, {removed: true}); // for soft remove
    }

    this.ready();
});
