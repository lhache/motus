import sqlite3, { Database }  from 'sqlite3'

function createTables(newdb: Database) {
    newdb.exec(`
        CREATE TABLE IF NOT EXISTS lemme (
            lemme TEXT PRIMARY KEY NOT NULL
        );
        CREATE TABLE IF NOT EXISTS word (
            word TEXT PRIMARY KEY NOT NULL
        );
        CREATE TABLE IF NOT EXISTS daily (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE NOT NULL,
            word TEXT NOT NULL,
            success BOOLEAN,
            words STRING
        );
        CREATE TABLE IF NOT EXISTS sprint (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE NOT NULL,
            words TEXT NOT NULL,
            score INTEGER,
            wordsInProgress STRING,
            timeLeftInSeconds INTEGER
        );
        CREATE TABLE IF NOT EXISTS sprint_free (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            words TEXT NOT NULL,
            score INTEGER,
            wordsInProgress STRING,
            timeLeftInSeconds INTEGER
        );
    `);
}

function createDatabase() {
  var newdb = new sqlite3.Database('motamot.db', (err) => {
      if (err) {
          console.log("Getting error " + err);
      }
      createTables(newdb);
  });
}


(() => {
    createDatabase()
})()