var subs = new SubsManager();

sampleRoutes.route('/customer', {
    name: 'sample.customer',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('sample_customer', subs.subscribe('sample_customer', Session.get('currentBranch')));
        // Location
        //this.register('sample_location', subs.subscribe('sample_location'));
    },
    action: function (params, queryParams) {
        Layout.main('sample_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        parent: 'sample.home'
    }
});
