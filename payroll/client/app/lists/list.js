// List
Payroll.ListState = new ReactiveObj();

Payroll.List = {
    gender: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        // Set default for update
        var id = Payroll.ListState.get(['customer', 'addressId']);
        Payroll.Collection.Address.find(id)
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    customer: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Payroll.Collection.Customer.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    overtimeStatus: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Yes', value: 'Yes'});
        list.push({label: 'No', value: 'No'});
        return list;
    }
};
