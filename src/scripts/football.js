/**
 * Gets team data from the NFL Team Stats API (https://rapidapi.com/DathanStoneDev/api/nfl-team-stats)
 * @param type  the type of stats to get (receiving, rushing, passing, or win or the valid options)
 * @param side  the team side to get stats for (defense, offense)
 * @param year  the year to get stats from
 * @param team  the team to get stats for
 */
function getTeamData(type='receiving', side='offense', year='2022', team='Jets') {
    const fetch = require('node-fetch');

    //Error checking + getting the url based on the request
    let url = null;
    if (type === 'receiving' || type === 'rushing' || type === 'passing') {
        url = `https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/${type}-stats/${side}/${year}`;
    }
    else if (type === 'win') {
        url = `https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/${type}-stats/${year}`;
    }
    else {
        console.error('Invalid type (no available endpoint)');
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed1a064420msh29fd9395b8669cfp1c89e9jsn5ff6eef88795',
            'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then((data) => {
            //Get the first parameter of the object
            let teamStatsList = null;
            switch (type) {
                case 'receiving':
                    teamStatsList = data['_embedded']['teamReceivingStatsList'];
                    break;
                case 'rushing':
                    teamStatsList = data['_embedded']['teamRushingStatsList'];
                    break;
                case 'passing':
                    teamStatsList = data['_embedded']['teamPassingStatsList'];
                    break;
                case 'win':
                    teamStatsList = data['_embedded']['teamWinStatsList'];
                    break;
                default:
                    console.error("Invalid endpoint");
            }
            //TODO -> Determine what to do with this data
            for(let x in teamStatsList) {
                if(teamStatsList[x].name === team)
                    console.log(teamStatsList[x]);
            }
            console.log(teamStatsList);
        })
        .catch(err => console.error('error:' + err));
}

//getTeamData(type='receiving', side='offense', year='2022', team='Jets');

/**
 * Gets player data from the AllSportsAPI (https://rapidapi.com/DathanStoneDev/api/nfl-team-stats)
 * @param name  the name of the player to get data on
 * TODO: Determine how to do this in one call rather than 3
 */
function getPlayerData(name) {
    //Three calls required per player:
        //Call 1 -> Searching for the player's ID
        //Call 2 -> Searching for the player's regular season stats
        //Call 3 -> Searching for the player's playoff season stats

    //TODO: Find an API that provides (a) player statistics by season and (b) a search feature for those players
    //TODO: You would think this would not be that hard. You would be wrong
}

getPlayerData("tom brady");

//console.log(getTeamData(type='rushing'));
