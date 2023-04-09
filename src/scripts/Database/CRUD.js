/**
 * Posts player data from the Sports.io API into a MongoDB
 * @param season
 * @param team
 */
async function postPlayerData(season, team) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const teamsCollection = dbConnection.collection('players');
        FantasyDataClient.NFLv3StatsClient.getPlayerSeasonStatsByTeamPromise(season, team)
            .then((resp) => {
                //You must work with the response (resp) in this callback function. It cannot be used outside the function.
                let players = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a player from the team (see team parameter) with stats from a given season (see season parameter). The amount of players will depend on the team.
                for (const player of players) {
                    removeUnneededPlayerData(player);
                }
                console.log(players[0]);
                players.forEach(player => postPlayerToMongoDB(player, dbConnection));
            })
            .catch((err) => {
                console.error("An error has occurred -> " + err);
            });
    }).catch((err) => "An error has occurred -> " + err);
}

//Posts a player to mongo db
//Player must be a singular object, db must be the database instance
function postPlayerToMongoDB(player, db) {
    db.collection('players')
        .replaceOne(player, player, {upsert : true})
        .then(result => {
            console.log("Successfully inserted player");
        })
        .catch(err => {
            console.error('Error inserting player: ', err);
        });
}

/**
 * Gets player data from the mongoDB by player name and season
 * There is another method for getting by ID as well
 * Also note that the short form of the player's name is used, in the form -> [first_initial].[last_name]
 * @param playerName
 * @param season
 * @returns {Promise<void>}
 */
async function getPlayerDataByNameAndSeason(playerName, season) {
    // Connecting to the DB client
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const testCollection = dbConnection.collection('players');
        //Find data by team and season
        testCollection.find({
            Name : playerName,
            Season : season
        }).toArray().then((result) => {
            console.log("DO THINGS WITH DATA HERE");
            // Note that right now I am just showing that this works
            // I'm not sure what to do with the data yet though
            console.log(`Data Found -> ${result.forEach(player => console.log(player))}`);
        });
    }).catch((err) => {
        console.log("An error has occurred -> " + err);
    });
}

/**
 * Gets player data from the mongoDB by player id and season
 * @param playerID
 * @param season
 * @returns {Promise<void>}
 */
async function getPlayerDataByPlayerIDAndSeason(playerID, season) {
    // Connecting to the DB client
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const testCollection = dbConnection.collection('players');
        //Find data by team and season
        testCollection.find({
            PlayerID : playerID,
            Season : season
        }).toArray().then((result) => {
            console.log("DO THINGS WITH DATA HERE");
            // Note that right now I am just showing that this works
            // I'm not sure what to do with the data yet though
            console.log(`Data Found -> ${result.forEach(player => console.log(player))}`);
        });
    }).catch((err) => {
        console.log("An error has occurred -> " + err);
    });
}

/**
 * Posts all team data from the Sports.io API from a particular season to a MongoDB
 * @param season
 */
async function postTeamData(season) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const teamsCollection = dbConnection.collection('teams');
        FantasyDataClient.NFLv3StatsClient.getTeamSeasonStatsPromise(season)
            .then((resp) => {
                //You must work with the response (resp) in this callback function. It cannot be used outside the function.
                let teams = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a team with their statistics from a given season (see season parameter). There are 32 items in this array cause there are 32 NFL teams.
                teams.forEach(team => postTeamToMongoDB(team, dbConnection));
            })
            .catch((err) => {
                console.error("An error has occurred -> " + err)
            });
    }).catch((err) => "An error has occurred -> " + err);
}

//Posts a team to mongo db
//Player must be a singular object, db must be the database instance
function postTeamToMongoDB(team, db) {
    db.collection('teams')
        .replaceOne(team, team, {upsert : true})
        .then(result => {
            console.log("Successfully inserted team");
        })
        .catch(err => {
            console.error('Error inserting team: ', err);
        });
}

/**
 * Gets team data from the mongoDB by team name abbreviation and season
 * There is another method for getting by ID as well
 * @param teamName
 * @param season
 * @returns {Promise<void>}
 */
async function getTeamDataByNameAndSeason(teamName, season) {
    // Connecting to the DB client
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const testCollection = dbConnection.collection('teams');
        //Find data by team and season
        testCollection.find({
            Team : teamName,
            Season : season
        }).toArray().then((result) => {
            console.log("DO THINGS WITH DATA HERE");
            // Note that right now I am just showing that this works
            // I'm not sure what to do with the data yet though
            console.log(`Data Found -> ${result.forEach(team => console.log(team))}`);
        });
    }).catch((err) => {
        console.log("An error has occurred -> " + err);
    });
}

/**
 * Gets team data by team id and season
 * @param teamID
 * @param season
 * @returns {Promise<void>}
 */
async function getTeamDataByTeamIDAndSeason(teamID, season) {
    // Connecting to the DB client
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

    MongoClient.connect(uri).then((client) => {
        const dbConnection = client.db('american_football');
        const testCollection = dbConnection.collection('teams');
        //Find data by team and season
        testCollection.find({
            TeamID : teamID,
            Season : season
        }).toArray().then((result) => {
            console.log("DO THINGS WITH DATA HERE");
            console.log(`Data Found -> ${result.forEach(team => console.log(team))}`);
        });
    }).catch((err) => {
        console.log("An error has occurred -> " + err);
    });
}

// TODO: Should we be allowing the user to select between Regular and Post-Season Stats?
/**
 * Method which updates team data from a starting season to an ending season in a batch (range -> [startSeason, endSeason])
 * @param startSeason
 * @param endSeason
 * @returns {Promise<void>}
 */
async function batchUpdateTeamData(startSeason, endSeason) {
    let seasons = [];
    let currSeason = startSeason;
    for (let i = startSeason; i <= endSeason; i++) {
        seasons.push(currSeason++);
    }
    seasons.forEach((season) => {
        postTeamData(`${season}REG`);
        console.log(`${season} Data Added!`);
    });
}

/**
 * Method which updates team data from a starting season to an ending season in a batch (range -> [startSeason, endSeason])
 * TODO: Find a way to make this more reliable (currently, the connection closes randomly due to the amount of times
 * TODO: it is being called, and likely due to sync issues)
 * @param startSeason
 * @param endSeason
 * @returns {Promise<void>}
 */
async function batchUpdatePlayerData(startSeason, endSeason) {
    //Set seasons length
    let seasons = [];
    let currSeason = startSeason;
    for (let i = startSeason; i <= endSeason; i++) {
        seasons.push(currSeason++);
    }
    //Get all team abbreviations
    seasons.forEach((season) => {
        // Redefining season so that it is specifically regular season data
        let regSeason = `${season}REG`
        const fdClientModule = require('fantasydata-node-client');
        const keys = {
            'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
        };
        const FantasyDataClient = new fdClientModule(keys);
        FantasyDataClient.NFLv3StatsClient.getTeamsBySeasonPromise(regSeason)
            .then((resp) => {
                //You must work with the response (resp) in this callback function. It cannot be used outside the function.
                let teams = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a team with their statistics from a given season (see season parameter). There are 32 items in this array cause there are 32 NFL teams.
                //Update the player stats for each team active this season
                teams.forEach((team) => {
                    let abbreviation = team['Key'];
                    postPlayerData(regSeason, abbreviation).catch((err) => "An error occurred -> " + err);
                    //setTimeout(postPlayerData(regSeason, abbreviation).catch((err) => "An error occurred -> " + err), 3000);
                    console.log(`Posted player data for ${abbreviation} ${regSeason}`);
                })
            })
            .catch((err) => {
                console.error("And error has occurred -> " + err)
            });
    })
}

/**
 * Method which updates team data from a starting season to an ending season in a batch (range -> [startSeason, endSeason])
 * At the moment, there is no way to do this that doesn't cause an error because of the amount of times
 * we would have to call it to do this insertion
 * @param startSeason
 * @param endSeason
 * @param teamAbbreviation
 * @returns {Promise<void>}
 */
async function batchUpdatePlayerDataByTeam(startSeason, endSeason, teamAbbreviation) {
    //Set seasons length
    let seasons = [];
    let currSeason = startSeason;
    for (let i = startSeason; i <= endSeason; i++) {
        seasons.push(currSeason++);
    }
    seasons.forEach((season) => {
        postPlayerData(`${season}REG`, teamAbbreviation);
        console.log(`${season} Data Added!`);
    });
}

//console.log(batchUpdatePlayerDataByTeam(2013, 2022, 'CIN'));


/**
 * Removes unnecessary fields from the returned player stats data
 * @param player  the player to delete data from
 */
function removeUnneededPlayerData(player) {
    delete player['SeasonType'];
    delete player['FantasyPoints'];
    delete player['FantasyPointsPPR'];
    delete player['FantasyPosition'];
    delete player['Temperature'];
    delete player['Humidity'];
    delete player['WindSpeed'];
    delete player['AuctionValue'];
    delete player['AuctionValuePPR'];
    delete player['FantasyPointsFanDuel'];
    delete player['FantasyPointsDraftKings'];
    delete player['FantasyPointsYahoo'];
    delete player['AverageDraftPosition'];
    delete player['AverageDraftPositionPPR'];
    delete player['FantasyPointsFantasyDraft'];
    delete player['AverageDraftPositionRookie'];
    delete player['AverageDraftPositionDynasty'];
    delete player['AverageDraftPosition2QB'];
    delete player['ScoringDetails'];
}