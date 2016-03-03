var subs = new SubsManager();

payrollRoutes.route('/customer', {
    name: 'payroll.customer',
    title: "Customer",
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('payroll_customer', subs.subscribe('payroll_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('payroll_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        parent: 'payroll.home'
    }
});
