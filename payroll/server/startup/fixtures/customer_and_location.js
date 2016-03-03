var branchId = '001';

Factory.define('location', Payroll.Collection.Location, {
    _id: function () {
        var locationId = idGenerator.gen(Payroll.Collection.Location, 4);
        return locationId;
    },
    name: function () {
        return faker.address.city();
    }
});

Factory.define('customer', Payroll.Collection.Customer, {
    _id: function () {
        var customerId = idGenerator.genWithPrefix(Payroll.Collection.Customer, branchId + '-', 6);
        return customerId;
    },
    name: function () {
        return faker.name.findName();
    },
    gender: function () {
        return faker.random.arrayElement(['M', 'F']);
    },
    dob: function () {
        return moment(faker.date.past()).toDate();
    },
    telephone: function () {
        return faker.phone.phoneNumber();
    },
    email: function () {
        faker.internet.email();
    },
    locationId: function () {
        var location = Factory.create('location');
        return location._id;
    },
    branchId: branchId
});
