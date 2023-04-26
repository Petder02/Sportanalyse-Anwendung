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
        "Atlanta Hawks",
        "Boston Celtics",
        "Charlotte Hornets",
        "Chicago Bulls",
        "Cleveland Cavaliers",
        "Dallas Mavericks",
        "Denver Nuggets",
        "Detroit Pistons",
        "Golden State Warriors",
        "Houston Rockets",
        "Indiana Pacers",
        "Los Angeles Clippers",
        "Los Angeles Lakers",
        "Memphis Grizzlies",
        "Miami Heat",
        "Milwaukee Bucks",
        "Minnesota Timberwolves",
        "New Orleans Pelicans",
        "New York Knicks",
        "Brooklyn Nets",
        "Oklahoma City Thunder",
        "Orlando Magic",
        "Philadelphia 76ers",
        "Phoenix Suns",
        "Portland Trail Blazers",
        "Sacramento Kings",
        "San Antonio Spurs",
        "Toronto Raptors",
        "Utah Jazz",
        "Washington Wizards",
    ]
    return teams[Math.floor(Math.random() * teams.length)];
}

const genRandPosition = () => {
    const positions = [
        "PG",
        "SG",
        "SF",
        "PF",
        "C"
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
        pointsPerGame: faker.datatype.number(20),
        reboundsPerGame: faker.datatype.number(20),
        assistsPerGame: faker.datatype.number(20),
        stealsPerGame: faker.datatype.number(30),
        blocksPerGame: faker.datatype.number(30),
        turnoversPerGame: faker.datatype.number(10),
        playerEfficiencyRating: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        winShares: faker.datatype.number(20),
        fieldGoalPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        threePointPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        freeThrowPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        effectiveFieldGoalPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        trueShootingPercentage: faker.datatype.float({min: 0, max: 100, precision: 0.01}),
    }
}
const newTeam = options => {
    return {
        team: genRandTeam(),
        season: faker.datatype.number({min: 2013, max: 2022}),
        pointsPerGame: faker.datatype.number(20),
        reboundsPerGame: faker.datatype.number(20),
        assistsPerGame: faker.datatype.number(20),
        stealsPerGame: faker.datatype.number(30),
        blocksPerGame: faker.datatype.number(30),
        turnoversPerGame: faker.datatype.number(10),
        playerEfficiencyRating: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        winShares: faker.datatype.number(20),
        fieldGoalPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        threePointPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        freeThrowPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        effectiveFieldGoalPercentage: faker.datatype.number({min: 0, max: 100, precision:0.01}),
        trueShootingPercentage: faker.datatype.float({min: 0, max: 100, precision: 0.01}),
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