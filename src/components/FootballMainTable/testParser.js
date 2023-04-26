const fs = require('fs');

// Read data from file
const rawData = fs.readFileSync('teams.json');
const data = JSON.parse(rawData);

// Remove _id field from each object in the array
/*
const formattedData = data.map(obj => {

    delete obj._id;
    return obj;
});
*/

const logIt = data.map(obj => {
    return obj.SeasonType;
});


//console.log(formattedData);

console.log(logIt[1]);

