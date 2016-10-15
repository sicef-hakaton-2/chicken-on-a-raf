Post = new Mongo.Collection('Post');
Ground.Collection(Post);

Meteor.methods({
    addPostWithoutCoordinates: (locationName, localeType, postType, title, content) => {
        if (Meteor.userId()) {
            var isAdminPost = Meteor.user().username === 'admin';
            Post.insert({
                locationName,
                localeType,
                postType,
                title,
                content,
                isAdminPost,
                author: 'Author',
                userId: Meteor.userId(),
                upvotes: 0,
                downvotes: 0,
                score: !isAdminPost ? 0 : 1337,
                createdAt: moment().unix()
            });
        }
        else {
            throw new Meteor.Error("logged-out", "The user must be logged in to post.");
        }
    },
    addPostWithCoordinates: (coordinates, localeType, postType, title, content) => {
        if (Meteor.userId()) {
            var loc = coordinates ? {type: "Point", coordinates: [coordinates.lat, coordinates.lng]} : null;
            Post.insert({
                loc,
                localeType,
                postType,
                title,
                content,
                author: 'Author',
                userId: Meteor.userId(),
                upvotes: 0,
                downvotes: 0,
                score: 0,
                createdAt: moment().unix()
            });
        }
        else {
            throw new Meteor.Error("logged-out", "The user must be logged in to post.");
        }
    },
    voteForPost: (postId, positive)=> {
        if (Meteor.userId()) {
            var user = Meteor.user();
            var post = Post.findOne({_id: postId});

            if (post) {
                if (!_.find(user.votedFor, (votedForEntry)=> {
                        return votedForEntry.postId === postId;
                    })) {
                    Meteor.users.update({_id: user._id}, {
                        $push: {
                            votedFor: {
                                postId,
                                positive
                            }
                        }
                    });

                    var upvotes = post.upvotes;
                    var downvotes = post.downvotes;
                    if (positive) {
                        upvotes++;
                    }
                    else {
                        downvotes++;
                    }

                    var score = PostScoreCalculator.hotScore(post.createdAt, upvotes, downvotes);

                    Post.update({_id: post._id}, {
                        "$set": {
                            upvotes: upvotes,
                            downvotes: downvotes,
                            score: score
                        }
                    });
                }
            }
        }
    }
});
