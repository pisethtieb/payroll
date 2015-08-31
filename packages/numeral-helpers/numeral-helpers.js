if (Meteor.isClient) {
    // Format
    Template.registerHelper('numeral', function (number, format) {
        return numeral(number).format(format);
    });

    // Unformat
    Template.registerHelper('numeralUf', function (string) {
        return numeral().unformat(string);
    });
}
