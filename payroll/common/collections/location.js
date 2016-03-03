// Collection
Payroll.Collection.Location = new Mongo.Collection("payroll_location");

// Schema
Payroll.Schema.Location = new SimpleSchema({
    name: {
        type: String,
        label: "Location"
    }
});

// Attach schema
Payroll.Collection.Location.attachSchema(Payroll.Schema.Location);

// Attach soft remove
//Payroll.Collection.Location.attachBehaviour('softRemovable');