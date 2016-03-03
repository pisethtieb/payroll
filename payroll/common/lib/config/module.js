// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Payroll = {
    name: 'Payroll System',
    version: '0.0.1',
    summary: 'Payroll Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'report'
    ],
    dump: {
        setting: [
            'payroll_location'
        ],
        data: [
            'payroll_customer',
            'payroll_order'
        ]
    }
};
