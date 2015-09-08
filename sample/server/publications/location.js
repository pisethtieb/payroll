// Publication
Meteor.publish('sample_location', function () {
    if (this.userId) {
        this.unblock();
        return Sample.Collection.Location.find({}, {removed: true});
    }
});
