/**
 * Declare template
 */
var indexTpl = Template.payroll_location,
    insertTpl = Template.payroll_locationInsert,
    updateTpl = Template.payroll_locationUpdate,
    showTpl = Template.payroll_locationShow;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify("location", {transition: 'zoom'});
});

indexTpl.helpers({
    selector: function () {
        return {};
    },
    tabularClass: function () {
        var self = this;
        var cssClass = 'table table-striped table-bordered table-condensed table-hover';
        if (self.cssClass) {
            cssClass += '-' + this.cssClass;
        }

        return cssClass;
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.location(fa("plus", "Location"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.location(fa("pencil", "Location"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Location"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Payroll.Collection.Location.remove(self._id, function (error) {
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
        alertify.alert(fa("eye", "Location"), renderTemplate(showTpl, this).html);
    }
});

/**
 * Insert
 */

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subLocation = this.subscribe('payroll_locationById', this.data._id);
});

updateTpl.helpers({
    data: function () {
        var data = Payroll.Collection.Location.findOne(this._id);
        return data;
    }
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subLocation = this.subscribe('payroll_locationById', this.data._id);
});

showTpl.helpers({
    data: function () {
        var data = Payroll.Collection.Location.findOne(this._id);
        return data;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    payroll_locationInsert: {
        before: {
            insert: function (doc) {
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
    payroll_locationUpdate: {
        onSuccess: function (formType, result) {
            alertify.location().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});