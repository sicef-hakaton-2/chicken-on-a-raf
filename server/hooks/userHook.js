Accounts.onCreateUser(function (options, user) {
    user.votedFor = [];
    user.lovedOnes = [];
    user.lastCheckIn = moment().unix();
    user.loveKey = Meteor.uuid().substring(0, 8);
    if (options.profile) {
        user.profile = options.profile;
    }
    return user;
});