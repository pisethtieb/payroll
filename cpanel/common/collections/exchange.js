/**
 * Collection
 */
Cpanel.Collection.Exchange = new Mongo.Collection("cpanel_exchange");

/**
 * Schema
 */
var Rates = new SimpleSchema({
    KHR: {
        type: Number,
        decimal: true,
        label: "KHR",
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    USD: {
        type: Number,
        decimal: true,
        label: "USD",
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    THB: {
        type: Number,
        decimal: true,
        label: "THB",
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    }
});

Cpanel.Schema.Exchange = new SimpleSchema({
    exDate: {
        type: Date,
        label: "Date",
        unique: true,
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    pickTime: false
                }
            }
        }
    },
    base: {
        type: String,
        label: "Base currency"
    },
    rates: {
        type: Rates
    }
});

/**
 * Attach schema
 */
Cpanel.Collection.Exchange.attachSchema(Cpanel.Schema.Exchange);
