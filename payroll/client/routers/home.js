payrollRoutes.route('/home', {
    name: 'payroll.home',
    title: 'Home',
    action: function (params, queryParams) {
        Layout.main('payroll_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
