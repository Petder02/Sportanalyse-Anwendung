function getPlayerData(type='overall', playerID='861446', tourID='264', seasonID='45109', playerStat='appearances') {
    const fetch = require('node-fetch');

    //Error checking + getting the url based on the request
    let url = null;
    if (type === 'overall') {
        url = `https://allsportsapi2.p.rapidapi.com/api/basketball/player/${playerID}/tournament/${tourID}/season/${seasonID}/statistics/overall`;
    } else if(type === 'seasons') {
        url = `https://allsportsapi2.p.rapidapi.com/api/basketball/player/${playerID}/statistics/season`;
    }
    else {
        console.error('Invalid type (no available endpoint)');
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed1a064420msh29fd9395b8669cfp1c89e9jsn5ff6eef88795',
            'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then((data) => {
            //Get the first parameter of the object
            let playerStats = data;
            switch (type) {
                case 'overall':
                    playerStats = data['statistics'][playerStat];
                    break;
                case 'seasons':
                    playerStats = data;
                    break;
                default:
                    console.error("Invalid endpoint");
            }
            //TODO -> Determine what to do with this data
            console.log(playerStats);
        })
        .catch(err => console.error('error:' + err));
}

getPlayerData(type='seasons', playerID='846936', tourID='264', seasonID='45109', playerStat='appearances');
