// Employees
Payroll.Collection.Employees.permit(['insert'])
    .payroll_ifDataInsert()
    .apply();
Payroll.Collection.Employees.permit(['update'])
    .payroll_ifDataUpdate()
    .apply();
Payroll.Collection.Employees.permit(['remove'])
    .payroll_ifDataRemove()
    .apply();
