let data;
const http = require("https");

const options = {
    "method": "GET",
    "hostname": "nfl-team-stats.p.rapidapi.com",
    "port": null,
    "path": "/v1/nfl-stats/teams/receiving-stats/offense/2019",
    "headers": {
        "X-RapidAPI-Key": "ed1a064420msh29fd9395b8669cfp1c89e9jsn5ff6eef88795",
        "X-RapidAPI-Host": "nfl-team-stats.p.rapidapi.com",
        "useQueryString": true
    }
};

const req = http.request(options, function (res) {
    const chunks = [];
    let num = 0;

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        const s = body.toString();
        const data = s.slice(s.indexOf("[", 0), s.indexOf("]", 0) + 1);
        const j = JSON.parse(data);
        console.log(j);
    });
});

req.end();
