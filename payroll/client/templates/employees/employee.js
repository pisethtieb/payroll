/**
 * Declare template
 */
var indexTpl = Template.payroll_employees,
    insertTpl = Template.payroll_employeesInsert,
    updateTpl = Template.payroll_employeesUpdate,
    showTpl = Template.payroll_employeesShow,

    locationAddOnTpl = Template.payroll_locationAddOnEmployees;

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
    createNewAlertify(["employees"], {size: 'lg'});
    createNewAlertify(["employeesShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    //selector: function () {
    //    return {branchId: Session.get('currentBranch')};
    //}
    selector: function () {
        let id = FlowRouter.getParam('departmentsId');
        return {departmentId: id}
    },
    customer: function () {
        let id = FlowRouter.getParam('departmentsId');
        let departments = Payroll.Collection.Departments.findOne({_id: id});
        return departments;

    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.employees(fa("plus", "Employees"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.employees(fa("pencil", "Employees"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Employees"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Payroll.Collection.Employees.remove(self._id, function (error) {
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
        alertify.employeesShow(fa("eye", "Employees"), renderTemplate(showTpl, this));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target)
            .closest('table')
            .DataTable();
        var rowData = dataTable.row(event.currentTarget)
            .data();

        FlowRouter.go('payroll.order', {employeesId: rowData._id});
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


    data(){
        let id = FlowRouter.getParam('departmentsId');
        return {
            departmentId: FlowRouter.getParam('departmentsId')


        }
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
    this.subscribe('payroll_employeesById', this.data._id);
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
        data = Payroll.Collection.Employees.findOne(this._id);

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
    this.subscribe('payroll_employeesById', this.data._id);
});

showTpl.helpers({
    data: function () {
        let data = Payroll.Collection.Employees.findOne(this._id);
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
    // Employees
    payroll_employeesInsert: {
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
    payroll_employeesUpdate: {
        onSuccess: function (formType, result) {
            alertify.employees().close();
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
