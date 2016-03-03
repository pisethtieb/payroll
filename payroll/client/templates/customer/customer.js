/**
 * Declare template
 */
var indexTpl = Template.payroll_customer,
    insertTpl = Template.payroll_customerInsert,
    updateTpl = Template.payroll_customerUpdate,
    showTpl = Template.payroll_customerShow,

    locationAddOnTpl = Template.payroll_locationAddOnCustomer;

/**
 * State
 */
var state = new ReactiveObj({
    location: {}
});

/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["customer"], {size: 'lg'});
    createNewAlertify(["customerShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.customer(fa("pencil", "Customer"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Customer"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Payroll.Collection.Customer.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .js-show': function (e, t) {
        alertify.customerShow(fa("eye", "Customer"), renderTemplate(showTpl, this));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target)
            .closest('table')
            .DataTable();
        var rowData = dataTable.row(event.currentTarget)
            .data();

        FlowRouter.go('payroll.order', {customerId: rowData._id});
    }
});

/**
 * Insert
 */
insertTpl.onCreated(function () {

});
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({
    location: function () {
        return state.get('location');
    }
});

insertTpl.events({
    'click .js-location-addon': function (e, t) {
        alertify.locationAddon(fa("plus", "Location"), renderTemplate(locationAddOnTpl));
    }
});

insertTpl.onDestroyed(function () {
    state.set('location', {});
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('payroll_customerById', this.data._id);
    state.set('location', {
        _id: this.data.locationId,
        name: this.data._location.name
    });
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    location: function () {
        return state.get('location');
    },
    data: function () {
        let data;
        data = Payroll.Collection.Customer.findOne(this._id);

        return data;
    }
});

updateTpl.events({
    'click .js-location-addon': function (e, t) {
        alertify.locationAddon(fa("plus", "Location"), renderTemplate(locationAddOnTpl));
    }
});

updateTpl.onDestroyed(function () {
    state.set('location', {});
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('payroll_customerById', this.data._id);
});

showTpl.helpers({
    data: function () {
        let data = Payroll.Collection.Customer.findOne(this._id);
        data.photoUrl = null;
        if (data.photo) {
            let photo = Files.findOne(data.photo);
            data.photoUrl = photo.url();
        }

        return data;
    }
});

/**
 * Location add on
 */
locationAddOnTpl.events({
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();

        //$('label [for="locationId"]').val('Lcation: ' + rowData._id);
        //$('[name="locationId"]').val(rowData._id);
        state.set('location', rowData);
        alertify.locationAddon().close();
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    payroll_customerInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    payroll_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    // Remote select2 (Meteor method)
    //$('[name="locationId"]')
    //    .select2({
    //        placeholder: "Search location",
    //        allowClear: true,
    //        minimumInputLength: 3,
    //        ajax: {
    //            data: function (params) {
    //                return params;
    //            },
    //            transport: function (args) {
    //                // Meteor method call
    //                Meteor.call('school_listAddress', args.data, function (err, results) {
    //                    if (err) {
    //                        args.error(err);
    //                        return;
    //                    }
    //
    //                    args.success(results);
    //                });
    //            },
    //            results: function (data) {
    //                var results = [];
    //                _.each(data, function (result) {
    //                    results.push({
    //                        id: result.value,
    //                        text: result.label
    //                    });
    //                });
    //
    //                return {results: results};
    //            }
    //        }
    //    });
};
