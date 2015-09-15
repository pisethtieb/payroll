/**
 * Declare template
 */
var indexTpl = Template.sample_customer,
    insertTpl = Template.sample_customerInsert,
    updateTpl = Template.sample_customerUpdate,
    showTpl = Template.sample_customerShow,
    locationAddonTpl = Template.sample_locationInsert;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Customer',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["customer", "location"]);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Sample.Collection.Customer.findOne(this._id);

        alertify.customer(fa("pencil", "Customer"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Customer"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Sample.Collection.Customer.softRemove(self._id, function (error) {
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
    'click .show': function (e, t) {
        var data = Sample.Collection.Customer.findOne({_id: this._id});
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo)
                .url();
        }

        alertify.alert(fa("eye", "Customer"), renderTemplate(showTpl, data));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target)
            .closest('table')
            .DataTable();
        var rowData = dataTable.row(event.currentTarget)
            .data();

        FlowRouter.go('sample.order', {customerId: rowData._id});
    }
});

indexTpl.onDestroyed(function () {
    //
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({});

insertTpl.events({
    'click .locationAddon': function (e, t) {
        alertify.location(fa("plus", "Location"), renderTemplate(locationAddonTpl))
    }
});

/**
 * Update
 */
updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({});

updateTpl.events({
    'click .locationAddon': function (e, t) {
        alertify.location(fa("plus", "Location"), renderTemplate(locationAddonTpl));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    sample_customerInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Sample.Collection.Customer, prefix, 4);
                doc.cpanel_branchId = Session.get('currentBranch');
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
    sample_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer()
                .close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    // Location addon
    sample_locationAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Sample.Collection.Location, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //alertify.location().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    // date
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);

    $('[name="locationId"]')
        .select2({
            placeholder: "Search location",
            allowClear: true,
            minimumInputLength: 3,
            ajax: {
                data: function (params) {
                    return params;
                },
                transport: function (args) {
                    // Meteor method call
                    Meteor.call('school_listAddress', args.data, function (err, results) {
                        if (err) {
                            args.error(err);
                            return;
                        }

                        args.success(results);
                    });
                },
                results: function (data) {
                    var results = [];
                    _.each(data, function (result) {
                        results.push({
                            id: result.value,
                            text: result.label
                        });
                    });

                    return {results: results};
                }
            }
        });

    // Remote select2
    //$('[name="locationId"]').select2({
    //    placeholder: "Search location",
    //    allowClear: true,
    //    ajax: {
    //        url: function (param) {
    //            var url = "/sample/locationRemote/" + param;
    //            return url;
    //        },
    //        type: "GET",
    //        dataType: 'json',
    //        delay: 250,
    //        //data: function (param) {
    //        //    return {term: param};
    //        //},
    //        results: function (data, page) {
    //            return {results: data};
    //        },
    //        cache: true
    //    },
    //    minimumInputLength: 3
    //});
};
