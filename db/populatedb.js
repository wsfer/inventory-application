// Standalone script to create tables and add some data to local or remote database
// Usage: node db/populatedb.js CONNECTION_STRING

const { Client } = require("pg");
const { argv } = require("node:process");

const CONNECTION_STRING = argv[2];

const SQL = `
  CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(700) NOT NULL,
    image_link VARCHAR(300) NOT NULL,
    steam_link VARCHAR(100),
    gog_link VARCHAR(100),
    other_link VARCHAR(100)
  );

  CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(20) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS game_genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE
  );

  INSERT INTO genre (name)
    VALUES ('Action'), ('Adventure'), ('Puzzle'), ('Strategy'), ('Survival'), ('Sandbox');

  INSERT INTO game (title, description, image_link, steam_link, gog_link, other_link)
    VALUES (
      'Terraria',
      'Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels?',
      'https://assets.nintendo.com/image/upload/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001702/dac3a26570b5ca1ddf703bf0add7cc7c527f71a2b56521baf69e20c7a573c610',
      'https://store.steampowered.com/app/105600/Terraria/',
      'https://www.gog.com/en/game/terraria',
      'https://terraria.org/'
    );

  INSERT INTO game_genre (game_id, genre_id) VALUES
    ((SELECT id FROM game WHERE title = 'Terraria'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM game WHERE title = 'Terraria'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM game WHERE title = 'Terraria'), (SELECT id FROM genre WHERE name = 'Sandbox'));
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString: CONNECTION_STRING });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
