const MongoClient = require('mongodb').MongoClient;
const dbScripts = require('../src/database-scripts/american-football-db-operations');
const FantasyDataClient = require("fantasydata-node-client");

jest.mock('fantasydata-node-client');

const uri = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority';

import {describe, it, beforeAll, afterAll, test, expect} from "@jest/globals"

describe('postTeamData', () => {
  let dbConnection;

  beforeAll(async () => {
    // Connect to a test MongoDB database
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    dbConnection = client.db('american_football');
  });

  afterAll(async () => {
    // Clean up the test database
    await dbConnection.dropDatabase();
    await dbConnection.close();
  });

  it('should insert team data into MongoDB', async () => {
    const season = '2022';
    const timeoutDelay = 100;
    const teams = [
      { Team: 'NE', Stat1: 1, Stat2: 2 },
      { Team: 'NYJ', Stat1: 3, Stat2: 4 },
    ];
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(FantasyDataClient.NFLv3StatsClient, 'getTeamSeasonStatsPromise')
      .mockResolvedValue(JSON.stringify(teams));

    await dbScripts.postTeamData(season, timeoutDelay, dbConnection);

    expect(dbConnection.collection('teams').find().toArray()).resolves.toEqual(teams);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('Inserted team 1/2');
    expect(console.log).toHaveBeenCalledWith('Inserted team 2/2');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    const season = '2022';
    const timeoutDelay = 100;
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(FantasyDataClient.NFLv3StatsClient, 'getTeamSeasonStatsPromise')
      .mockRejectedValue(new Error('An error has occurred'));

    await dbScripts.postTeamData(season);

    expect(console.log).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('An error has occurred -> Error: An error has occurred');
  });
});

describe('postPlayerData', () => {
  test('should post player data to MongoDB', (done) => {
    dbScripts.postPlayerData('2022', 'DAL', () => {
      // Check that the players were inserted into MongoDB
      MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db('american_football');
        db.collection('players').findOne({ 'Name': 'Ezekiel Elliott' }, function(err, result) {
          if (err) throw err;
          expect(result.Name).toBe('Ezekiel Elliott');
          done();
        });
      });
    });
  });

  test('should handle errors gracefully', (done) => {
    dbScripts.postPlayerData('2022', 'NONEXISTENT_TEAM', (err) => {
      expect(err).not.toBeNull();
      done();
    });
  });
});

