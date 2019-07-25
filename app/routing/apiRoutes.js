const friends = require("../data/friends.js");


module.exports = (app) => {
    app.get("/api/friends", (req, res) => {

        res.json(friends);
    });


    app.post('/api/friends', (req, res) => {
        const userInfo = req.body;
        const userResponses = userInfo.scores;

        let match = '';
        let matchImg = '';
        let totalDiff = 9000;

        // Get the difference for each question
        for (let i = 0; i < friends.length; i++) {
            let diff = 0;
            for (let j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            if (diff < totalDiff) {
                totalDiff = diff;
                match = friends[i].name;
                matchImg = friends[i].photo;
            }
        }

        friends.push(userInfo);

        res.json({ status: 'OK', match: match, matchImg: matchImg });
    });
};
