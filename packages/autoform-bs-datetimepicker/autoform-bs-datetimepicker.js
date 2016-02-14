AutoForm.addInputType("bootstrap-datetimepicker", {
    template: "afBootstrapDateTimePicker",
    valueIn: function (val, atts) {
        // datetimepicker expects the date to represent local time,
        // so we need to adjust it if there's a timezoneId specified
        var timezoneId = atts.timezoneId;
        if (typeof timezoneId === "string") {
            if (typeof moment.tz !== "function") {
                throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
            }
            if (val instanceof Date) {
                return moment(AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, timezoneId), "YYYY-MM-DD[T]HH:mm:ss.SSS").toDate();
            }
        }

        return val;
    },
    valueOut: function () {
        var dtp = this.data("DateTimePicker");
        var m = dtp.date();
        var format = dtp.format();
        if (!m) {
            return m;
        }

        var timezoneId = this.attr("data-timezone-id");
        // default is local, but if there's a timezoneId, we use that
        if (typeof timezoneId === "string") {
            if (typeof moment.tz !== "function") {
                throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
            }
            m = moment.tz(AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(m.toDate()), timezoneId);
        }
        // We should use the same format that was defined for the datetimepicker
        //return m.format(format);

        return m.toDate();
    },
    valueConverters: {
        "string": function (val) {
            return (val instanceof Date) ? val.toString() : val;
        },
        "stringArray": function (val) {
            if (val instanceof Date) {
                return [val.toString()];
            }
            return val;
        },
        "number": function (val) {
            return (val instanceof Date) ? val.getTime() : val;
        },
        "numberArray": function (val) {
            if (val instanceof Date) {
                return [val.getTime()];
            }
            return val;
        },
        "dateArray": function (val) {
            if (val instanceof Date) {
                return [val];
            }
            return val;
        }
    },
    contextAdjust: function (context) {
        if (context.atts.timezoneId) {
            context.atts["data-timezone-id"] = context.atts.timezoneId;
        }
        delete context.atts.timezoneId;
        return context;
    }
});

Template.afBootstrapDateTimePicker.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.dateTimePickerOptions;
        return atts;
    }
});

Template.afBootstrapDateTimePicker.onRendered(function () {
    var $input = this.$('input');
    var data = this.data;
    var opts = data.atts.dateTimePickerOptions || {};

    // To be able to properly detect a cleared field, the defaultDate,
    // which is "" by default, must be null instead. Otherwise we get
    // the current datetime when we call getDate() on an empty field.
    if (!opts.defaultDate || opts.defaultDate === "") {
        opts.defaultDate = data.value;
    }

    // instanciate datetimepicker
    $input.datetimepicker(opts);


    // set and reactively update values
    this.autorun(function () {
        var currentData = Template.currentData();
        var dtp = $input.data("DateTimePicker");

        // set field value
        // if data.value is not corresponging to Date format, it will be cleared
        dtp.date(currentData.value);

        // set start date if there's a min in the schema
        if (currentData.min instanceof Date) {
            dtp.minDate(currentData.min);
        }

        // set end date if there's a max in the schema
        if (currentData.max instanceof Date) {
            dtp.maxDate(currentData.max);
        }
    });


});

Template.afBootstrapDateTimePicker.onDestroyed(function () {
    var dtp = this.$('input').data("DateTimePicker");
    if (dtp) {
        dtp.destroy();
    }
});