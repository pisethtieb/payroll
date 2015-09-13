var branchId = '001';

Factory.define('location', Sample.Collection.Location, {
    _id: function () {
        var locationId = idGenerator.gen(Sample.Collection.Location, 4);
        return locationId;
    },
    name: function () {
        return faker.address.city();
    }
});

Factory.define('customer', Sample.Collection.Customer, {
    _id: function () {
        var customerId = idGenerator.genWithPrefix(Sample.Collection.Customer, branchId + '-', 6);
        return customerId;
    },
    name: faker.name.findName(),
    gender: faker.random.arrayElement(['M', 'F']),
    dob: moment(faker.date.past()).format('YYYY-MM-DD'),
    telephone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    locationId: function () {
        var location = Factory.create('location');
        return location._id;
    },
    cpanel_branchId: branchId
});
