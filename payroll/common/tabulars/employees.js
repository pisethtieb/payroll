// Employess
Payroll.TabularTable.Employees = new Tabular.Table({
    name: "payroll_employeesList",
    collection: Payroll.Collection.Employees,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [{
        "width": "12px", "targets": 0
    }],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.payroll_employeesAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},

        {
            data: "dob",
            title: "Date of Birth",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },

        {data: "telephone", title: "Telephone"},
        {data: "email", title: "Email"},
        {
            data: "doj", title: "Date Of Join",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "currentPosition", title: "Current Position"},
        {
            data: "photo",
            title: "Photo",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(val);
                    return lightbox(img.url(), doc._id, doc.name);
                }
            }
        }
    ]
});