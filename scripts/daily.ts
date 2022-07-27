import sqlite3  from 'sqlite3'
import { words } from './daily-dataset';

const chainValuesFromDate = (dateFrom: Date, items: string[]): string => {
  let values = '';
  for (let i = 0; i < items.length; i++) {
    const date = dateFrom.setDate(dateFrom.getDate() + 1)
    const isoDate = new Date(date).toISOString();
    const formattedDate = isoDate.split('T')[0]
    values += `("${formattedDate}", "${items[i]}")${i === items.length - 1 ? '' : ', '}` 
  }
  // console.log(values.toString());
  return values
}

(async () => {
 
  
  try {

    // open the database
    const db = new sqlite3.Database('./motamot.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.log('Connected to the motamot database.');
      
      const query = `INSERT INTO daily (date, word) VALUES ${chainValuesFromDate(new Date(), words)};`
      db.exec(query);

    });
    // db.close();
  }
  catch(e) {
    console.log(e)
  }
})()

