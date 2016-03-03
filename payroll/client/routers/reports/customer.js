/**
 * Browser view
 */
payrollRoutes.route('/customerReport', {
    name: 'payroll.customerReport',
    title: "Customer Report",
    action: function (params, queryParams) {
        Layout.main('payroll_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'payroll.home'
    }
});

payrollRoutes.route('/customerReportGen', {
    name: 'payroll.customerReportGen',
    title: "Customer Report",
    action: function (params, queryParams) {
        Layout.report('payroll_customerReportGen');
    }
});

/**
 * Excel
 */
payrollRoutes.route('/customerExcelReport', {
    name: 'payroll.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('payroll_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'payroll.home'
    }
});
