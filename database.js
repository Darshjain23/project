import pg from 'pg'


function setDB() {
    const client = new pg.Client({
      user: 'postgres',
      host: 'localhost',
      database: 'register',
      password: '123456',
      port: 5432
    });
    
    client.connect(function (err) {
      if (err) throw err;
      console.log("connected")
    });

    return(client)
  }

  async function checkEmail(email,client) {
    var query2 = "select * from register1 where email_id = $1"
    var data = await client.query(query2, [email])
      return(data)
  }

  async function insertdata(fname,email,password,client) {
    var query1 = "insert into register1 (name,email_id,pass) values ($1,$2,$3)"
    var data = await client.query(query1, [fname, email, password])
}



  export {setDB,checkEmail,insertdata}