var subs = new SubsManager();

payrollRoutes.route('/order/:customerId', {
    name: 'payroll.order',
    title: 'Order',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'payroll_orderByCustomer',
        //    subs.subscribe('payroll_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('payroll_order');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'Order',
        parent: 'payroll.customer'
    }
});
