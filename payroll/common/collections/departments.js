// Collection
Payroll.Collection.Departments = new Mongo.Collection("payroll_departments");

// Schema
Payroll.Schema.Departments = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    overtimeStatus: {
        type: String,
        label: "OverTime Status",
        autoform: {
            type: "select2",
            options: function () {
                return Payroll.List.overtimeStatus();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    rate: {
        type: Number,
        label: "Rate(OverTime/Hour)"
    },

    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Payroll.Collection.Departments.attachSchema(Payroll.Schema.Departments);

// Attach soft remove
//Payroll.Collection.Departments.attachBehaviour('softRemovable');