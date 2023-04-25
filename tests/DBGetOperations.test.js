global.TextEncoder = require("text-encoding").TextEncoder;
const assert = require("assert");
const mongo = require("mongodb");
const app = require("../src/database-scripts/american-football-db-operations");

import {describe, it} from "@jest/globals"

describe("getPlayerDataByNameAndSeason", function() {
  it("should return an array of players", async function() {
    const result = await app.getPlayerDataByNameAndSeason("Tom Brady", 2021);
    assert(Array.isArray(result));
  });
  it("should return an empty array for non-existent player name", async function() {
    const result = await app.getPlayerDataByNameAndSeason("Non-Existent Player", 2021);
    assert.deepStrictEqual(result, []);
  });
});

describe("getPlayerDataByPlayerIDAndSeason", function() {
  it("should return an array of players", async function() {
    const result = await app.getPlayerDataByPlayerIDAndSeason("12345", 2021);
    assert(Array.isArray(result));
  });
  it("should return an empty array for non-existent player ID", async function() {
    const result = await app.getPlayerDataByPlayerIDAndSeason("00000", 2021);
    assert.deepStrictEqual(result, []);
  });
});

describe("getTeamDataByNameAndSeason", function() {
  it("should return an array of teams", async function() {
    const result = await app.getTeamDataByNameAndSeason("Tampa Bay Buccaneers", 2021);
    assert(Array.isArray(result));
  });
  it("should return an empty array for non-existent team name", async function() {
    const result = await app.getTeamDataByNameAndSeason("Non-Existent Team", 2021);
    assert.deepStrictEqual(result, []);
  });
});

describe("getTeamDataByTeamIDAndSeason", function() {
  it("should return an array of teams", async function() {
    const result = await app.getTeamDataByTeamIDAndSeason("56789", 2021);
    assert(Array.isArray(result));
  });
  it("should return an empty array for non-existent team ID", async function() {
    const result = await app.getTeamDataByTeamIDAndSeason("00000", 2021);
    assert.deepStrictEqual(result, []);
  });
});
