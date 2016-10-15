Ground.Collection(Meteor.users);

Meteor.methods({
    addLovedOne: (lovedOneKey)=> {
        if (Meteor.user()) {
            var user = Meteor.user();
            var lovedOne = Meteor.users.findOne({loveKey: lovedOneKey});

            if (lovedOne) {
                if (lovedOne.loveKey !== user.loveKey && !_.find(user.lovedOnes, (lovedOneEntry)=> {
                        return lovedOneKey === lovedOneEntry.key;
                    })) {

                    Meteor.users.update({_id: Meteor.userId()}, {
                        $push: {
                            lovedOnes: {
                                key: lovedOne.loveKey,
                                lastCheckIn: lovedOne.lastCheckIn
                            }
                        }
                    });
                }
            }
            else {
                throw new Meteor.Error("no-loved-one", "The loved one doesn't exist with that key.");
            }
        }
        else {
            throw new Meteor.Error("logged-out", "The user must be logged in to post.");
        }
    },

    checkIn: () => {
        var user = Meteor.user();
        if (user) {
            var timestamp = moment().unix();
            Meteor.users.update({_id: Meteor.userId()}, {
                $set: {
                    lastCheckIn: timestamp
                }
            });

            Meteor.users.update({"lovedOnes.key": user.loveKey}, {
                $set: {
                    "lovedOnes.$.lastCheckIn": timestamp
                }
            })
        }
        else {
            throw new Meteor.Error("logged-out", "The user must be logged in to post.");
        }
    }
});