var subs = new SubsManager();

payrollRoutes.route('/departments', {
    name: 'payroll.departments',
    title: "Departments",
    subscriptions: function (params, queryParams) {
        // department
        //this.register('payroll_department', subs.subscribe('payroll_department', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('payroll_departments');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Departments',
        parent: 'payroll.home'
    }
});
