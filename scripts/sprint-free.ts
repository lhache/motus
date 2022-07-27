import sqlite3  from 'sqlite3'

(async () => {
  try {
    // open the database
    const db = new sqlite3.Database('./motamot.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.log('Connected to the motamot database.');
      const query = `INSERT INTO sprint_free (words) VALUES 
        ('signer,cuite,pluriel,sebace,capuccino,agence,trahir,rouer,deferent,verdoyer'),
        ('journee,rampe,liant,mouvement,plongee,episcopat,reproche,collier,torchis,rogue'),
        ('dragueur,histoire,secateur,couleur,nefaste,epiler,satan,zigue,chevet,faussaire'),
        ('trainee,lunch,habite,pactiser,sales,diffuseur,xenon,etriper,salicaire,aubepine')
      `
      // console.log(query)
      db.exec(query);

    });
    // db.close();
  }
  catch(e) {
    console.log(e)
  }
})()

