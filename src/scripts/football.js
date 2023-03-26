/*
const http = require("https");

const options = {
    "method": "GET",
    "hostname": "nfl-team-stats.p.rapidapi.com",
    "port": null,
    "path": "/v1/nfl-stats/teams/passing-stats/offense/2021",
    "headers": {
        "X-RapidAPI-Key": "dd7eac4825msh896dbd0a91bacfbp1bd84fjsn6521550eb446",
        "X-RapidAPI-Host": "nfl-team-stats.p.rapidapi.com",
        "useQueryString": true
    }
};

const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString())
    });
});

req.end();
*/

const request = require('request');

const options = {
    method: 'GET',
    url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2022',
    headers: {
        'X-RapidAPI-Key': 'ed1a064420msh29fd9395b8669cfp1c89e9jsn5ff6eef88795',
        'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com',
        useQueryString: true
    }
};

let data = null;

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    data = JSON.parse(body);
    console.log(data['_embedded'].teamReceivingStatsList);
});