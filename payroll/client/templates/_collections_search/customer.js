///**
// * Declare template
// */
//var indexTpl = Template.payroll_customerSearch,
//    listTpl = Template.payroll_customerSearchList,
//
//    customerAddonTpl = Template.payroll_addressInsert;
//
///**
// * Index
// */
//indexTpl.onCreated(function () {
//    createNewAlertify("customer");
//});
//
//indexTpl.events({
//    'click .insert': function (e, t) {
//        alertify.customer(fa("plus", "Customer"), renderTemplate(customerAddonTpl))
//            .maximize();
//    },
//    'change .filter-select': function (e) {
//        var instance = EasySearch.getComponentInstance({
//            index: 'payroll_customerSearch'
//        });
//
//        EasySearch.changeProperty('payroll_customerSearch', 'filteredGender', $(e.target).val());
//        EasySearch.changeLimit('payroll_customerSearch', 10);
//
//        instance.paginate(1);
//        instance.triggerSearch();
//    },
//    'change .sort-select': function (e) {
//        var instance = EasySearch.getComponentInstance({
//            index: 'payroll_customerSearch'
//        });
//
//        EasySearch.changeProperty('payroll_customerSearch', 'sortBy', $(e.target).val());
//        EasySearch.changeLimit('payroll_customerSearch', 10);
//
//        instance.paginate(1);
//        instance.triggerSearch();
//    }
//});
//
///**
// * List
// */
//listTpl.helpers({
//    data: function () {
//        var self = this;
//
//        self.photoUrl = null;
//
//        if (!_.isUndefined(self.photo)) {
//            self.photoUrl = Files.findOne(self.photo).url();
//        }
//
//        self.dobVal = moment(self.dob).format('DD-MM-YYYY');
//
//        return self;
//    }
//});
