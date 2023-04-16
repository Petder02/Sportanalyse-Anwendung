const {MongoClient} = require("mongodb");

// Exported functions
module.exports = {
    /**
     * Obtain a player by their name and season
     * @param playerName
     * @param season
     * @returns {Promise<WithId<Document>[]>}
     */
    getPlayerDataByNameAndSeason: (playerName, season) => {
        return MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
            let db = client.db('american_football')
            let collection = db.collection('players')
            return collection.find({Name: playerName, Season: season}).toArray();
        }).then((player) => {
            console.log(player)
            return player;
        })
    },
    /**
     * Obtain a player by their id and season
     * @param playerID
     * @param season
     * @returns {Promise<WithId<Document>[]>}
     */
    getPlayerDataByPlayerIDAndSeason: (playerID, season) => {
        return MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
            let db = client.db('american_football')
            let collection = db.collection('players')
            return collection.find({PlayerID: playerID, Season: season}).toArray();
        }).then((player) => {
            console.log(player)
            return player;
        })
    },
    /**
     * Get team by name and season
     * @param teamName
     * @param season
     * @returns {Promise<WithId<Document>[]>}
     */
    getTeamDataByNameAndSeason: (teamName, season) => {
        return MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
            let db = client.db('american_football')
            let collection = db.collection('teams')
            return collection.find({Team: teamName, Season: season}).toArray();
        }).then((team) => {
            console.log(team)
            return team;
        })
    },
    /**
     * Get team by id and season
     * @param teamID
     * @param season
     * @returns {Promise<WithId<Document>[]>}
     */
    getTeamDataByTeamIDAndSeason: (teamID, season) => {
        return MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
            let db = client.db('american_football')
            let collection = db.collection('teams')
            return collection.find({TeamID: teamID, Season: season}).toArray();
        }).then((team) => {
            console.log(team)
            return team;
        })
    },
    /**
     * Posts player data from the Sports.io API into a MongoDB
     * @param season
     * @param team
     * @param timeoutDelay Specified how long each call should be delayed by
     */
    postPlayerData: (season, team, timeoutDelay=1000) => {
        const fdClientModule = require('fantasydata-node-client');
        const keys = {
            'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
        };
        const FantasyDataClient = new fdClientModule(keys);
        let MongoClient = require('mongodb').MongoClient
        let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

        MongoClient.connect(uri).then((client) => {
            const dbConnection = client.db('american_football');
            FantasyDataClient.NFLv3StatsClient.getPlayerSeasonStatsByTeamPromise(season, team)
                .then((resp) => {
                    //You must work with the response (resp) in this callback function. It cannot be used outside the function.
                    let players = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a player from the team (see team parameter) with stats from a given season (see season parameter). The amount of players will depend on the team.
                    for (const player of players) {
                        removeUnneededPlayerData(player);
                    }
                    players.forEach((player, index) => {
                        setTimeout((() => {
                            postPlayerToMongoDB(player, dbConnection)
                            console.log("Team -> " + team + " | Season -> " + season + " | Inserted player " + (index + 1) + "/" + players.length);
                        }), (index + 1) * timeoutDelay)
                    });
                    console.log("Finished inserting players from " + team + " in " + season + "season");
                })
                .catch((err) => {
                    console.error("An error has occurred -> " + err);
                });
        }).catch((err) => "An error has occurred -> " + err);
    },
    /**
     * Posts all team data from the Sports.io API from a particular season to a MongoDB
     * @param season
     * @param timeoutDelay
     */
    postTeamData: (season, timeoutDelay=1000) => {
        const fdClientModule = require('fantasydata-node-client');
        const keys = {
            'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
        };
        const FantasyDataClient = new fdClientModule(keys);
        let MongoClient = require('mongodb').MongoClient
        let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

        MongoClient.connect(uri).then((client) => {
            const dbConnection = client.db('american_football');
            FantasyDataClient.NFLv3StatsClient.getTeamSeasonStatsPromise(season)
                .then((resp) => {
                    //You must work with the response (resp) in this callback function. It cannot be used outside the function.
                    let teams = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a team with their statistics from a given season (see season parameter). There are 32 items in this array cause there are 32 NFL teams.
                    teams.forEach((team, index) => {
                        setTimeout((() => {
                            postTeamToMongoDB(team, dbConnection)
                            console.log("Inserted team " + (index + 1) + "/" + teams.length);
                        }), (index + 1) * timeoutDelay)
                    });
                })
                .catch((err) => {
                    console.error("An error has occurred -> " + err)
                });
        }).catch((err) => "An error has occurred -> " + err);
    },
    /**
     * Batch updates player data from start to end season
     * @param startSeason
     * @param endSeason
     * @param timeDelay
     */
    batchUpdatePlayerData: (startSeason, endSeason, timeDelay=10000) => {
        //For each season, add player data
        for (let currSeason = startSeason; currSeason <= endSeason; currSeason++) {
            // Redefining season so that it is specifically regular season data
            let regSeason = `${currSeason}REG`
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
                    teams.forEach((team, index) => {
                        setTimeout((() => {
                            let abbreviation = team['Key'];
                            console.log(abbreviation);
                            module.exports.postPlayerData(regSeason, abbreviation).catch((err) => "An error occurred -> " + err);
                            console.log(`Posted player data for ${abbreviation} ${regSeason}`);
                        }), (index + 1) * timeDelay);
                    })
                })
                .catch((err) => {
                    console.error("And error has occurred -> " + err)
                });
        }
    },
    /**
     * Batch updates team data from start to end season
     * @param startSeason
     * @param endSeason
     * @param timeDelay
     */
    batchUpdateTeamData: (startSeason, endSeason, timeDelay=1000) => {
        let seasons = [];
        let currSeason = startSeason;
        for (let i = startSeason; i <= endSeason; i++) {
            seasons.push(currSeason++);
        }
        seasons.forEach((season, index) => {
            setTimeout((() => {
                module.exports.postTeamData(`${season}REG`);
            }), timeDelay * (index + 1));
            console.log(`${season} Data Added!`);
        });
    }

}

// Helper Functions

/**
 * Posts a team to mongo db
 * @param team
 * @param db
 */
function postTeamToMongoDB(team, db) {
    db.collection('teams')
        .replaceOne(team, team, {upsert : true})
        .then(() => {
            console.log("Successfully inserted team with abbreviation -> " + team["Team"]);
        })
        .catch(err => {
            console.error('Error inserting team with abbreviation -> ' + team["Team"], err);
        });
}

/**
 * Posts a player to mongo db
 * @param player
 * @param db
 */
function postPlayerToMongoDB(player, db) {
    db.collection('players')
        .replaceOne(player, player, {upsert : true})
        .then(result => {
            console.log("Successfully inserted player with name -> " + player["Name"]);
        })
        .catch(err => {
            console.error(`Error inserting player with name -> ${player["Name"]}: `, err);
        });
    console.log("Finishing");
}

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