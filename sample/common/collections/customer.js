// Collection
Sample.Collection.Customer = new Mongo.Collection("sample_customer");

// Schema
Sample.Schema.Customer = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
        //unique: true,
        //max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Sample.List.gender();
            }
            //type: "selectize",
            //afFieldInput: {
            //    multiple: true,
            //    selectizeOptions: {}
            //}
        }
    },
    dob: {
        type: String,
        label: "Date of Birth"
    },
    locationId: {
        type: String,
        label: "Location"
        //autoform: {
        //    type: "select2",
        //    afFieldInput: {
        //        select2Options: {
        //            // Must enter at least 1 character before we search
        //            minimumInputLength: 1,
        //            // Cannot select multiple items
        //            multiple: false,
        //            // Fetch the results with a Meteor method instead of ajax
        //            ajax: {
        //                transport: function (params, success, failure) {
        //                    Meteor.call('school_listAddress', params.data.q, function (err, results) {
        //                        if (err) {
        //                            failure(err);
        //                            return;
        //                        }
        //
        //                        success(results);
        //                    });
        //                },
        //                processResults: function (data) {
        //                    var results = [];
        //                    _.each(data.results, function (result) {
        //                        results.push({
        //                            id: result._id,
        //                            text: result.name
        //                        });
        //                    });
        //
        //                    return {
        //                        results: results
        //                    };
        //                }
        //            }
        //        }
        //    }
        //}
    },
    telephone: {
        type: String,
        label: "Telephone",
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    photo: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        },
        optional: true
    },
    cpanel_branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Sample.Collection.Customer.attachSchema(Sample.Schema.Customer);

// Attach soft remove
Sample.Collection.Customer.attachBehaviour('softRemovable');