import { faker } from "@faker-js/faker"

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}


const newPerson = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(40),
        visits: faker.datatype.number(1000),
        progress: faker.datatype.number(100),
        status: faker.helpers.shuffle(["relationship", "complicated", "single"])[0]
    }
}

const genRandTeam = () => {
    const teams = [
        "ARI",
        "ATL",
        "BAL",
        "BUF",
        "CAR",
        "CHI",
        "CIN",
        "CLE",
        "DAL",
        "DEN",
        "DET",
        "GB",
        "HOU",
        "IND",
        "JAC",
        "KC",
        "LV",
        "LAC",
        "LAR",
        "MIA",
        "MIN",
        "MIN",
        "NE",
        "NO",
        "NYG",
        "NYJ",
        "PHI",
        "PIT",
        "SF",
        "SEA",
        "TB",
        "TEN",
        "WAS"
    ]
    return teams[Math.floor(Math.random() * teams.length)];
}

const genRandPosition = () => {
    const positions = [
        "QB",
        "RB",
        "FB",
        "TB",
        "HB",
        "OL",
        "G",
        "LG",
        "RG",
        "T",
        "LT",
        "RT",
        "C",
        "WR",
        "TE",
        "DL",
        "DE",
        "LE",
        "RE",
        "DT",
        "NT",
        "LB",
        "MLB",
        "ILB",
        "OLB",
        "LOLB",
        "ROLB",
        "SLB",
        "WLB",
        "DB",
        "CB",
        "S",
        "SS",
        "FS",
        "LS",
        "P",
        "K",
        "PR"
    ]
    return positions[Math.floor(Math.random() * positions.length)];
}

const genRandStatNumber = (min=0, max=100) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const newPlayer = options => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        team: genRandTeam(),
        position: genRandPosition(),
        scoreQuarter1: faker.datatype.number(100),
        scoreQuarter2: faker.datatype.number(100),
        scoreQuarter3: faker.datatype.number(100),
        scoreQuarter4: faker.datatype.number(100),
        firstDownsByRushing: faker.datatype.number(1000),
        offensiveYards: faker.datatype.number(1000),
        passingYards: faker.datatype.number(1000),
        passerRating: faker.datatype.float({max: 100, precision: 0.01}),
        rushingYards: faker.datatype.number(1000),
        receivingYards: faker.datatype.number(1000),
        thirdDownAttempts: faker.datatype.number(50),
        redZoneAttempts: faker.datatype.number(59)
    }
}


// Reads data from file and stores in array. Then retrieves each column from the array and stores in a variable.
/*const fs = require('fs');

// Read data from file
const rawData = fs.readFileSync('teams.json');
const data = JSON.parse(rawData);
*/

//"SeasonType": 1,
//   "Season": 2019,
//   "Team": "ARI",
//   "Score": 361,
//   "OpponentScore": 442,
//   "TotalScore": 803,
//   "Temperature": 52,
//   "Humidity": 51,
//   "WindSpeed": 3,
//   "OverUnder": 38,
//   "PointSpread": 3.6,
//   "ScoreQuarter1": 77,
//   "ScoreQuarter2": 95,
//   "ScoreQuarter3": 67,
//   "ScoreQuarter4": 119,
//   "ScoreOvertime": 3,
//   "TimeOfPossession": "28:41",
//   "FirstDowns": 252,
//   "FirstDownsByRushing": 88,
//   "FirstDownsByPassing": 142,
//   "FirstDownsByPenalty": 23,
//   "OffensivePlays": 804,
//   "OffensiveYards": 4395,
//   "OffensiveYardsPerPlay": 3.6,
/*
const seasonType = data.map(obj => {

    return obj.SeasonType;
});

const season = data.map(obj => { return obj.Season; });

const team = data.map(obj => { return obj.Team; });

const score = data.map(obj => { return obj.Score; });

const opponentScore = data.map(obj => { return obj.OpponentScore; });

const totalScore = data.map(obj => { return obj.TotalScore; });

const temperature = data.map(obj => { return obj.Temperature; });

const humidity = data.map(obj => { return obj.Humidity; });

const windSpeed = data.map(obj => { return obj.WindSpeed; });

const overUnder = data.map(obj => { return obj.OverUnder; });

const pointSpread = data.map(obj => { return obj.PointSpread; });

const scoreQuarter1 = data.map(obj => { return obj.ScoreQuarter1; });

const scoreQuarter2 = data.map(obj => { return obj.ScoreQuarter2; });


const newPerson = (d) => {
    return {
        season: season[d],
        seasonType: seasonType[d],
        team: team[d],
        score: score[d],
        opponentScore: opponentScore[d],
        totalScore: totalScore[d],
    }
}
*/




//old makdata function. Does not use loops
export function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newPlayer(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}


//This function uses loops. By using loops, we can use the data from the json file at each loop using the index
// export function makeData(...lens) {
//     const makeDataLevel = (depth = 0) => {
//         const len = lens[depth];
//         const rows = [];
//
//         for (let d = 0; d < len; d++) {
//             const row = {
//                 ...newPlayer(),
//             };
//
//             if (lens[depth + 1]) {
//                 row.subRows = makeDataLevel(depth + 1);
//             }
//
//             rows.push(row);
//         }
//
//         return rows;
//     }
//     return makeDataLevel();
// }

