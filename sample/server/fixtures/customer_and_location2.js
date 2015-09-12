//Meteor.startup(function () {
//    console.log('Fixtures is running...');
//
//    var branchId = '001';
//    if (Sample.Collection.Location.find({}).count() == 0) {
//        // Location
//        _.times(10, function (n) {
//            var locationId = idGenerator.gen(Sample.Collection.Location, 4);
//            Sample.Collection.Location.insert({
//                _id: locationId,
//                name: faker.address.city()
//            });
//
//            // Customer
//            _.times(10, function (n) {
//                var customerId = idGenerator.genWithPrefix(Sample.Collection.Customer, branchId + '-', 6);
//                Sample.Collection.Customer.insert({
//                    _id: customerId,
//                    name: faker.name.findName(),
//                    gender: faker.random.arrayElement(['M', 'F']),
//                    dob: moment(faker.date.past()).format('YYYY-MM-DD'),
//                    telephone: faker.phone.phoneNumber(),
//                    email: faker.internet.email(),
//                    locationId: locationId,
//                    photo: '',
//                    cpanel_branchId: branchId
//                });
//            });
//        });
//    }
//
//    console.log('Fixtures is ready');
//});
