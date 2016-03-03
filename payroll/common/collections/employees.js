// Collection
Payroll.Collection.Employees = new Mongo.Collection("payroll_employees");

// Schema
Payroll.Schema.Employees = new SimpleSchema({
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
    address: {
        type: String,
        label: "Address",
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    },
    id: {
        type: String,
        label: "Passport Or Nation ID",
        optional: true
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
    departmentId: {
        type: String,
        label: "Department"

    },
    qualification: {
        type: String,
        label: "Qualification"

    },
    currentPosition: {
        type: String,
        label: "Current Position"
    },
    doj: {
        type: Date,
        label: "Date of Join",
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
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Payroll.Collection.Employees.attachSchema(Payroll.Schema.Employees);

// Attach soft remove
//Payroll.Collection.Employees.attachBehaviour('softRemovable');