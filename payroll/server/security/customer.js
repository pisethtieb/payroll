// Customer
Payroll.Collection.Customer.permit(['insert'])
    .payroll_ifDataInsert()
    .apply();
Payroll.Collection.Customer.permit(['update'])
    .payroll_ifDataUpdate()
    .apply();
Payroll.Collection.Customer.permit(['remove'])
    .payroll_ifDataRemove()
    .apply();
