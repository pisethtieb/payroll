/**
 * Declare template
 */
var indexTpl = Template.payroll_departments,
    insertTpl = Template.payroll_departmentsInsert,
    updateTpl = Template.payroll_departmentsUpdate,
    showTpl = Template.payroll_departmentsShow,

    locationAddOnTpl = Template.payroll_locationAddOnDepartments;

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
    createNewAlertify(["departments"], {size: 'sm'});
    createNewAlertify(["departmentsShow"]);
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
        alertify.departments(fa("plus", "Departments"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {

        alertify.departments(fa("pencil", "Departments"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Departments"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Payroll.Collection.Departments.remove(self._id, function (error) {
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
        alertify.departmentsShow(fa("eye", "Departments"), renderTemplate(showTpl, this));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target)
            .closest('table')
            .DataTable();
        var rowData = dataTable.row(event.currentTarget)
            .data();

        FlowRouter.go('payroll.employees', {departmentsId: rowData._id});
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
    //location: function () {
    //    return state.get('location');
    //}
});

insertTpl.events({
    'change .status'(e, t){

        let status = $('.status').val()
        if (status == 'No') {
            $('.rate').val(0);
        }
        debugger;

    }
});

insertTpl.onDestroyed(function () {
    state.set('location', {});
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    //this.subscribe('payroll_departmentsById', this.data._id);
    //state.set('location', {
    //    _id: this.data.locationId,
    //    name: this.data._location.name
    //});
});

updateTpl.onRendered(function () {
    //configOnRender();
});

updateTpl.helpers({
    //location: function () {
    //    return state.get('location');
    //},
    //data: function () {
    //    let data;
    //    data = Payroll.Collection.Departments.findOne(this._id);
    //
    //    return data;
    //}
});

updateTpl.events({
    //'click .js-location-addon': function (e, t) {
    //    alertify.locationAddon(fa("plus", "Location"), renderTemplate(locationAddOnTpl));
    //}
    'change .status'(e, t){
        let status = $('.status').val()
        if (status == 'No') {
            $('.rate').val(0);
        }


    }
});

updateTpl.onDestroyed(function () {
    state.set('location', {});
});
/**
 * Show
 */
showTpl.onCreated(function () {

});

showTpl.helpers({
    //data: function () {
    //    let data = Payroll.Collection.Departments.findOne(this._id);
    //
    //    return data;
    //}
});

/**
 * Hook
 */
AutoForm.hooks({
    // Departments
    payroll_departmentsInsert: {
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
    payroll_departmentsUpdate: {
        onSuccess: function (formType, result) {
            alertify.departments().close();
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
