let db = require('./american-football-db-operations')

//Should return J.Burrow
db.getPlayerDataByNameAndSeason("J.Burrow", 2022).then((player) => {
    console.log("The following player was successfully obtained -> " + player[0]["Name"])
}).catch(err => {
    console.log("An error occurred -> " + err);
})

// WIP

//Should also return J.Burrow