import sqlite3, { Database }  from 'sqlite3'

function createTables(newdb: Database) {
    newdb.exec(`
        CREATE TABLE IF NOT EXISTS lemme (
            lemme TEXT PRIMARY KEY NOT NULL
        );

        CREATE TABLE IF NOT EXISTS word (
            word TEXT PRIMARY KEY NOT NULL
        );
    `);
}

function createDatabase() {
  var newdb = new sqlite3.Database('motus.db', (err) => {
      if (err) {
          console.log("Getting error " + err);
      }
      createTables(newdb);
  });
}


(() => {
    createDatabase()
})()