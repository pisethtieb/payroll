// Departments
Payroll.Collection.Departments.permit(['insert'])
    .payroll_ifDataInsert()
    .apply();
Payroll.Collection.Departments.permit(['update'])
    .payroll_ifDataUpdate()
    .apply();
Payroll.Collection.Departments.permit(['remove'])
    .payroll_ifDataRemove()
    .apply();
