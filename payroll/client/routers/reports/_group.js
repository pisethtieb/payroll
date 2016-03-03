payrollRoutes = FlowRouter.group({
    prefix: '/payroll',
    //subscriptions: function (params, queryParams) {
    //    // Global subscriptions for route group
    //    this.register('payroll_address', Meteor.subscribe('payroll_address'));
    //}
    title: "Payroll",
    titlePrefix: 'Payroll > '
});
