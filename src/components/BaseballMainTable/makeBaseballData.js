import { faker } from "@faker-js/faker"

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const genRandTeam = () => {
    const teams = [
        "Arizona Diamondbacks",
        "Atlanta Braves",
        "Baltimore Orioles",
        "Boston Red Sox",
        "Chicago Cubs",
        "Chicago White Sox",
        "Cincinnati Reds",
        "Cleveland Guardians",
        "Colorado Rockies",
        "Detroit Tigers",
        "Houston Astros",
        "Kansas City Royals",
        "Los Angeles Angels",
        "Los Angeles Dodgers",
        "Miami Marlins",
        "Milwaukee Brewers",
        "Minnesota Twins",
        "New York Mets",
        "New York Yankees",
        "Oakland Athletics",
        "Philadelphia Phillies",
        "Pittsburgh Pirates",
        "San Diego Padres",
        "San Francisco Giants",
        "Seattle Mariners",
        "St. Louis Cardinals",
        "Tampa Bay Rays",
        "Texas Rangers",
        "Toronto Blue Jays",
        "Washington Nationals",
    ]
    return teams[Math.floor(Math.random() * teams.length)];
}

const genRandPosition = () => {
    const positions = [
        "P",
        "C",
        "FB",
        "SB",
        "SS",
        "TB",
        "LF",
        "CF",
        "RF"
    ]
    return positions[Math.floor(Math.random() * positions.length)];
}

const newPlayer = options => {
    return {
        firstName: faker.name.firstName("male"),
        lastName: faker.name.lastName(),
        team: genRandTeam(),
        position: genRandPosition(),
        season: faker.datatype.number({min: 2013, max: 2022}),
        assists: faker.datatype.number(100),
        battingAverage: faker.datatype.number({min: 0, max: 1, precision:0.001}),
        doubles: faker.datatype.number(100),
        earnedRuns: faker.datatype.number(30),
        earnedRunAverage: faker.datatype.number({min: 0, max: 1, precision:0.01}),
        errors: faker.datatype.number(10),
        hits: faker.datatype.number(150),
        homeRuns: faker.datatype.number(20),
        runs: faker.datatype.number(50),
        runsBattedIn: faker.datatype.number(50),
        singles: faker.datatype.number(100),
        stolenBases: faker.datatype.number(50),
        triples: faker.datatype.number(20)
    }
}
const newTeam = options => {
    return {
        team: genRandTeam(),
        season: faker.datatype.number({min: 2013, max: 2022}),
        assists: faker.datatype.number(100),
        doubles: faker.datatype.number(100),
        earnedRuns: faker.datatype.number(30),
        earnedRunAverage: faker.datatype.number({min: 0, max: 1, precision:0.01}),
        errors: faker.datatype.number(10),
        hits: faker.datatype.number(150),
        homeRuns: faker.datatype.number(20),
        runs: faker.datatype.number(50),
        singles: faker.datatype.number(100),
        stolenBases: faker.datatype.number(50),
        strikeouts: faker.datatype.number(500),
        triples: faker.datatype.number(20),
        walks: faker.datatype.number(150)
    }
}

export function makePlayerData(...lens) {
    console.log(lens)
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

export function makeTeamData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newTeam(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}