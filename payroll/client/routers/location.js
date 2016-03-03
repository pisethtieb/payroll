var subs = new SubsManager();

payrollRoutes.route('/location', {
    name: 'payroll.location',
    title: 'Location',
    subscriptions: function (params, queryParams) {
        //this.register('payroll_location', subs.subscribe('payroll_location'));
    },
    action: function (params, queryParams) {
        Layout.main('payroll_location');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Location',
        parent: 'payroll.home'
    }
});
