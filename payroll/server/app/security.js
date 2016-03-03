/**
 * Setting
 */
Security.defineMethod("payroll_ifSetting", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['setting'], 'Payroll');
    }
});

/**
 * Data Entry
 */
Security.defineMethod("payroll_ifDataInsert", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-insert'], 'Payroll');
    }
});

Security.defineMethod("payroll_ifDataUpdate", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-update'], 'Payroll');
    }
});

Security.defineMethod("payroll_ifDataRemove", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-remove'], 'Payroll');
    }
});

/**
 * Report
 */
Security.defineMethod("payroll_ifReport", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['report'], 'Payroll');
    }
});
