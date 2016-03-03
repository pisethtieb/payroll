// Collection
Payroll.Collection.Customer = new Mongo.Collection("payroll_customer");

// Schema
Payroll.Schema.Customer = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Payroll.List.gender();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    dob: {
        type: Date,
        label: "Date of Birth",
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    pickTime: false,
                    showToday: true
                }
            }
        }
    },
    telephone: {
        type: String,
        label: "Telephone",
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    locationId: {
        type: String,
        label: "Location"
    },
    photo: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Payroll.Collection.Customer.attachSchema(Payroll.Schema.Customer);

// Attach soft remove
//Payroll.Collection.Customer.attachBehaviour('softRemovable');