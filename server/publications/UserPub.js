Meteor.publish('userData', function () {
    var user = Meteor.users.findOne({_id: this.userId});

    return Meteor.users.find({
        topSecretLoveKey: {
            $in: _.pluck(user.lovedOnes, 'key')
        }
    });
});

Meteor.publish('allUsers', function() {
    return Meteor.users.find({});
})