/**
 * Gets team data from the NFL Team Stats API (https://rapidapi.com/DathanStoneDev/api/nfl-team-stats)
 * @deprecated This is a legacy function, do not use it
 * @param type  the type of stats to get (receiving, rushing, passing, or win or the valid options)
 * @param side  the team side to get stats for (defense, offense)
 * @param year  the year to get stats from
 * @param team  the team to get stats for
 */
function getTeamDataLegacy(type='receiving', side='offense', year='2022', team='Jets') {
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

/**
 * Gets player data from the Sports.io API and reads it into a database
 * @param season
 * @param team
 * TODO: Read this into a database once it is made
 */
function getPlayerData(season, team) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);

    FantasyDataClient.NFLv3StatsClient.getPlayerSeasonStatsByTeamPromise(season, team)
        .then((resp) => {
            //You must work with the response (resp) in this callback function. It cannot be used outside the function.
            let players = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a player from the team (see team parameter) with stats from a given season (see season parameter). The amount of players will depend on the team.
            for (const player of players) {
                removeUnneededPlayerData(player);
            }
            console.log(players);
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

/**
 * Gets all team data from the Sports.io API and reads it into a database
 * @param season
 */
function getTeamData(season) {
    const fdClientModule = require('fantasydata-node-client');
    const keys = {
        'NFLv3StatsClient': '9a89010dda0643388baf8867abb798df',
    };
    const FantasyDataClient = new fdClientModule(keys);

    FantasyDataClient.NFLv3StatsClient.getTeamSeasonStatsPromise(season)
        .then((resp) => {
            //You must work with the response (resp) in this callback function. It cannot be used outside the function.
            let teams = JSON.parse(resp); // <- This is an array of JSON instances. Each instance is a team with their statistics from a given season (see season parameter). There are 32 items in this array cause there are 32 NFL teams.
            console.log(teams);
        })
        .catch((err) => {
            console.error("And error has occurred -> " + err)
        });
}

//Testing
/*
Two example calls to the functions. Make sure to only use these when you are testing because they use up calls
If we ever run out of calls, let me know and I will generate a new API key
 */
//getPlayerData('2021REG', "CIN");
//getTeamData("2021REG");
