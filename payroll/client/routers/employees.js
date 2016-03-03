var subs = new SubsManager();

payrollRoutes.route('/employees/:departmentsId', {
    name: 'payroll.employees',
    title: "Employees",
    subscriptions: function (params, queryParams) {
        // department
        //this.register('payroll_department', subs.subscribe('payroll_department', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('payroll_employees');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Employees',
        parent: 'payroll.departments'
    }
});
