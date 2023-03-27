/**
 * Gets team data from the NFL Team Stats API (https://rapidapi.com/DathanStoneDev/api/nfl-team-stats)
 * @param type  the type of stats to get (receiving, rushing, passing, or win or the valid options)
 * @param side  the team side to get stats for (defense, offense)
 * @param year  the year to get stats from
 * @param team  the specific team to get stats for
 */
function getTeamData(type='receiving', side='offense', year='2022', team='Steelers') {
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
        })
        .catch(err => console.error('error:' + err));
}

getTeamData(type='receiving', side='offense', year='2022', team='Jets');

/**
 * Gets player data from the A (https://rapidapi.com/DathanStoneDev/api/nfl-team-stats)
 * @param name  the name of
 */
function getPlayerData() {
    //TODO: Find an API in which this can be reasonably implemented with
}

//console.log(getTeamData(type='rushing'));
