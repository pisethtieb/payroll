/**
 * Declare template
 */
var formTpl = Template.payroll_customerReport,
    genTpl = Template.payroll_customerReportGen;

/**
 * Form Hooks
 */
AutoForm.hooks({
    payroll_customerReport: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            // You must call this.done()!
            //this.done(); // submitted successfully, call onSuccess
            //this.done(new Error('foo')); // failed to submit, call onError with the provided error
            this.done(null, insertDoc); // submitted successfully, call onSuccess with `result` arg set to "foo"
            //return false;
        },
        onSuccess: function (formType, result) {
            var params = {};
            var queryParams = result;
            var path = FlowRouter.path("payroll.customerReportGen", params, queryParams);

            window.open(path, '_blank');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});


/**
 * Generate
 */
genTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        // Use Fetcher
        Fetcher.setDefault("data", false);
        Fetcher.retrieve('data', 'payroll_customerReport', q);

        return Fetcher.get('data');
    }
});