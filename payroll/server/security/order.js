// Order
Payroll.Collection.Order.permit(['insert'])
    .payroll_ifDataInsert()
    .apply();
Payroll.Collection.Order.permit(['update'])
    .payroll_ifDataUpdate()
    .apply();
Payroll.Collection.Order.permit(['remove'])
    .payroll_ifDataRemove()
    .apply();
