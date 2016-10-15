//public double getHotScore(int createdOn,int upVotes, int downVotes, long timestamp) {
//    int seconds = createdOn - (int) (timestamp / 1000);
//    int diff = upVotes - downVotes;
//    double order = log10(max(abs(diff),1));
//    double score = round(signum(diff)*order + seconds / 45000);
//    return randomScoreAdjustment(score);
//}
PostScoreCalculator = {
    hotScore: (createdAt, upvotes, downvotes) => {
        var seconds = createdAt - moment().unix();

        var diff = upvotes - downvotes;

        return diff;

        //var order = Math.log10(Math.max(Math.abs(diff), 1));

        //return Math.round(Math.sign(diff) * order + seconds / 45000);
    }
};