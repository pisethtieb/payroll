// Departments
Payroll.TabularTable.Departments = new Tabular.Table({
    name: "payroll_departmentsList",
    collection: Payroll.Collection.Departments,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [{
        "width": "12px", "targets": 0
    }],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.payroll_departmentsAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "_branch.enName", title: "Branch Name"},
        {data: "overtimeStatus", title: "Overtime Status"},

        {data: "rate", title: "Rate"}
    ]
});