// Collection
Sample.Collection.Order = new Mongo.Collection("sample_order");

// Schema
Sample.Schema.Order = new SimpleSchema({
    orderDate: {
        type: Date,
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    customerId: {
        type: String
    },
    des: {
        type: String,
        label: "Description"
    },
    items: {
        type: [Object]
    },
    'items.$.name': {
        type: String
    },
    'items.$.qty': {
        type: Number
    },
    'items.$.price': {
        type: Number,
        decimal: true
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true
    },
    cpanel_branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Sample.Collection.Order.attachSchema(Sample.Schema.Order);

// Attach soft remove
Sample.Collection.Order.attachBehaviour('softRemovable');