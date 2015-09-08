Meteor.methods({
    school_listAddress: function (partialName) {
        check(partialName, String);
        var results = Sample.Collection.Location.find({
            name: {
                '$regex': '^' + partialName,
                '$options': 'i'
            }
        }, {
            //limit: 10,
            fields: {
                _id: 1,
                name: 1
            }
        }).fetch();

        return {results: results};
    }
});