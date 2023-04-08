const express = require('express')
const {ObjectId, MongoClient} = require('mongodb')
const {connectToDb, getDb} = require('./db')
const fdClientModule = require("fantasydata-node-client");

// init app & middlware
const app = express()
app.use(express.json())

// // db connection
//let db
// connectToDb((err) => {
//     if (!err) {
//         app.listen(12000, () => {
//             console.log('app listening on port 12000')
//         })
//     }
//     db = getDb()
//     //console.log(db);
// })

// Retrieve one object from database
app.get('/test/:id', (req, res) => {
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
     db.collection('test')
      .findOne({_id: id})
      .then(doc => {
         res.status(200).json(doc)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not fetch the document'})
      })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})

// Add new object to database
app.post('/test', (req, res) => {
    const book = req.body
    db.collection('test')
     .insertOne(book)
     .then(result => {
        res.status(200).json(result)
     })
     .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
     })
})

/**
 * Gets player data from the Sports.io API and reads it into a database
 * @param season
 * @param team
 * TODO: Read this into a database once it is made
 */
async function getPlayerData(season, team) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'
    let client = await MongoClient.connect(uri);
    let db_connection = client.db();
    FantasyDataClient.NFLv3StatsClient.getPlayerSeasonStatsByTeamPromise(season, team)
        .then((resp) => {
            //You must work with the response (resp) in this callback function. It cannot be used outside the function.
            let players = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a player from the team (see team parameter) with stats from a given season (see season parameter). The amount of players will depend on the team.
            for (const player of players) {
                removeUnneededPlayerData(player);
            }
            console.log(players[0]);
            players.forEach(player => postPlayerToMongoDB(player, db_connection));
        })
        .catch((err) => {
            console.error("And error has occurred -> " + err);
        });
}

//Posts a player to mongo db
//Player must be a singular object, db must be the database instance
function postPlayerToMongoDB(player, db) {
    db.collection('football_players')
        .insertOne(player)
        .then(result => {
            console.log("Successfully inserted player");
        })
        .catch(err => {
            console.error('Error inserting player: ', err);
        });
}

/**
 * Gets all team data from the Sports.io API and reads it into a database
 * @param season
 */
async function getTeamData(season) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);
    let MongoClient = require('mongodb').MongoClient
    let uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'
    let client = await MongoClient.connect(uri);
    let db_connection_2 = client.db();

    FantasyDataClient.NFLv3StatsClient.getTeamSeasonStatsPromise(season)
        .then((resp) => {
            //You must work with the response (resp) in this callback function. It cannot be used outside the function.
            let teams = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a team with their statistics from a given season (see season parameter). There are 32 items in this array cause there are 32 NFL teams.
            teams.forEach(team => postTeamToMongoDB(team, db_connection_2));
            //console.log(teams);
        })
        .catch((err) => {
            console.error("And error has occurred -> " + err)
        });
}

//Posts a team to mongo db
//Player must be a singular object, db must be the database instance
function postTeamToMongoDB(team, db) {
    db.collection('test_football_teams')
        .insertOne(team)
        .then(result => {
            console.log("Successfully inserted team");
        })
        .catch(err => {
            console.error('Error inserting team: ', err);
        });
}

// getPlayerData('2021REG', "CIN");
getTeamData("2021REG");
//console.log(players);

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

// Delete an object from database
app.delete('/test/:id', (req, res) => {
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
     db.collection('test')
      .deleteOne({_id: id})
      .then(result => {
         res.status(200).json(result)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not delete the document'})
      })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})

// Update attribute in an object
app.patch('/test/:id', (req, res) => {
    const updates = req.body
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
        db.collection('test')
            .updateOne({_id: id}, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update the document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})