import sqlite3  from 'sqlite3'


(async () => {

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

  try {

    // open the database
    const db = new sqlite3.Database('./motamot.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.log('Connected to the motamot database.');
      const query = `select lemme from lemme order by random() limit 10;`

      let valueString = '('
       db.all(query, function(err, rows) {
        for (let i = 0; i < rows.length; i++) {
  
          valueString += `"${rows[i].lemme}"${i === rows.length - 1 ? '' : ', '}` 
        }
        // rows.forEach(function (row) {
        //   valueString += `"${row.lemme}",`;
        //     console.log(row);
        // });
        valueString += ')';
        console.log(valueString)
     });
    });
    db.close();
  }
  catch(e) {
    console.log(e)
  }
})()

