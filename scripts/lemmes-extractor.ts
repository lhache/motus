import { readFile } from 'fs/promises';
import uniq from 'lodash/uniq'
import sqlite3  from 'sqlite3'

const wordIsValid = (word: string) => {
  const correctLength = word.length > 4 && word.length < 10
  const noUndesiredChar = !/\s|\-/g.test(word);
  return correctLength && noUndesiredChar
}

const cleanupWord = (word: string) => word.normalize('NFKD').replace(/[^\w]/g, '');

(async () => {
  let finalLexicon: string[] = []
  try {
    const args = process.argv.slice(2)
    const file = args[0]
    const dbTable = args[1]

    const data = await readFile(file, {
      encoding: 'utf8'
    })
    var words: string[] = data.toString().split("\n");

    words.map((word: string) => {
      if (wordIsValid(word)) {
        finalLexicon.push(cleanupWord(word))
      }
    })
    // remove dupes
    finalLexicon = uniq(finalLexicon)

    // open the database
    const db = new sqlite3.Database('./motamot.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.log('Connected to the motamot database.');
      finalLexicon.map((word: string) => {
        if (wordIsValid(word)) {
          
          db.exec(`
              INSERT INTO ${dbTable} (${dbTable}) VALUES ("${word}");
          `, () => {
            console.log(`
            INSERT INTO ${dbTable} (${dbTable}) VALUES ("${word}");
        `)
          });
        }
      })
    });
    // db.close();
  }
  catch(e) {
    console.log(e)
  }
})()

