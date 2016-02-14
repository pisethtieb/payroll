//Meteor.startup(function () {
//    if (Sample.Collection.Customer.find({}).count() == 0) {
//        _.times(100000, function (n) {
//            Factory.create('customer');
//        });
//    }
//});

Meteor.startup(function () {
    if (Sample.Collection.Customer.find({}).count() == 0) {
        _.times(1, function (n) {
            // Location
            var locatData = {
                name: faker.address.city()
            };
            var locatId = Sample.Collection.Location.insert(locatData);
            console.log('fixture id: ' + locatId);

            // Customer
            //_.times(1, function (n) {
            //    var cusData = {
            //        name: faker.name.findName(),
            //        gender: faker.random.arrayElement(['M', 'F']),
            //        dob: moment(faker.date.past()).toDate(),
            //        telephone: faker.phone.phoneNumber(),
            //        email: faker.internet.email(),
            //        locationId: locatId,
            //        branchId: '001'
            //    };
            //    Sample.Collection.Customer.insert(cusData);
            //});
        });
    }
});
