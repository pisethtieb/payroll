var indexTpl = Template.sample_location,
    insertTpl = Template.sample_locationInsert,
    updateTpl = Template.sample_locationUpdate,
    showTpl = Template.sample_locationShow;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Location',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify("location");
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.location(fa("plus", "Location"), renderTemplate(insertTpl));
    },
    'click .update': function (e, t) {
        var data = Sample.Collection.Location.findOne(this._id);
        alertify.location(fa("pencil", "Location"), renderTemplate(updateTpl, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Location"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Sample.Collection.Location.softRemove(self._id, function (error) {
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
        var data = Sample.Collection.Location.findOne({_id: this._id});
        alertify.alert(fa("eye", "Location"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});

// Insert
insertTpl.onRendered(function () {
    //
});

insertTpl.events({
    //
});

// Update
updateTpl.onRendered(function () {
    //
});

updateTpl.events({
    //
});

// Hook
AutoForm.hooks({
    sample_locationInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Sample.Collection.Location, 4);
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
    sample_locationUpdate: {
        onSuccess: function (formType, result) {
            alertify.location().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});