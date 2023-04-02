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
function getPlayerData(season, team) {
    //Three calls required per player:
    //Call 1 -> Searching for the player's ID
    //Call 2 -> Searching for the player's regular season stats
    //Call 3 -> Searching for the player's playoff season stats

    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);

    FantasyDataClient.NFLv3StatsClient.getPlayerSeasonStatsByTeamPromise(season, team)
        .then((resp) => {
            let players = JSON.parse(resp);
            for (let i = 0; i < players.length; i++) {
                removeUnneededPlayerData(players[i]);
            }
            console.log(players[20]);
        })
        .catch((err) => {
            console.error("And error has occurred -> " + err)
        });
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

getPlayerData('2021REG', "CIN");

//console.log(getTeamData(type='rushing'));
