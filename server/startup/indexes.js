Meteor.startup(function () {
    Post._ensureIndex({"loc": "2dsphere"});
});
