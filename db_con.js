var mysql=require('mysql')

const db = mysql.createConnection({
    hostname: 'localhost',
    user: 'root',
    password: '',
    database: 'my_db'
});

db.connect((err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('Successfully connected')
    }
});

module.exports = mysql;
module.exports = db;