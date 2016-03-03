// Location
Payroll.Collection.Location.permit(['insert', 'update', 'remove'])
    .payroll_ifSetting()
    .apply();
