const express = require('express');
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 10000;
const routes = require('./routes');

app.use('/api', routes)
app.use(express.json());

module.exports = router;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Define route for API to get player info based on name, season, team
app.get('/getPlayer/:playerName/:season/:team', (req, res) => {
    const playerName = req.params.playerName;
    const season = parseInt(req.params.season);
    const team = req.params.team;

    MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
        let db = client.db('american_football')
        let collection = db.collection('players')
        return collection.find({Name: playerName, Season: season, Team: team}).toArray();
    }).then((player) => {
        res.send(player);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
});

router.get('/getPlayer/:playerName/:season/:team', (req, res) => {
    const playerName = req.params.playerName;
    const season = parseInt(req.params.season);
    const team = req.params.team;

    MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
        let db = client.db('american_football')
        let collection = db.collection('players')
        return collection.find({Name: playerName, Season: season, Team: team}).toArray();
    }).then((player) => {
        res.send(player);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
})

// Define route for API to get team info based on team name and season
app.get('/getTeam/:teamName/:season', (req, res) => {
    const teamName = req.params.teamName;
    const season = parseInt(req.params.season);

    MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
        let db = client.db('american_football')
        let collection = db.collection('teams')
        return collection.find({Team: teamName, Season: season}).toArray();
    }).then((team) => {
        res.send(team);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
});

router.get('/getTeam/:teamName/:season', (req, res) => {
    const teamName = req.params.teamName;
    const season = parseInt(req.params.season);

    MongoClient.connect('mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority').then((client) => {
        let db = client.db('american_football')
        let collection = db.collection('teams')
        return collection.find({Team: teamName, Season: season}).toArray();
    }).then((team) => {
        res.send(team);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
    });
})
