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