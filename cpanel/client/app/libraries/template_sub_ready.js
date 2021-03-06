/**
 * Template sub ready
 */
templateSubsReady = function () {
    var subs, ready;
    var slice = [].slice;
    var tmpl = Template.instance();

    subs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (subs.length === 0) {
        ready = tmpl.subscriptionsReady();
    } else { // > 0
        subs = subs.slice(0, subs.length - 1);
        ready = _.reduce(subs, function (memo, sub) {
            return memo && ((ref = tmpl[sub]) != null ? typeof ref.ready === "function" ? ref.ready() : void 0 : void 0);
        }, true);
    }

    return ready;
};

Template.registerHelper('templateSubsReady', templateSubsReady);
