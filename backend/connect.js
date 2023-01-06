const mysql = require('mysql');
const connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"sdre",
    database:'shortcut_url'
})
module.exports = new Promise((resolve, reject) => {
    connection.connect((err)=>{
        if(err){
            console.log("Error to connecting database = " + err)
            return;
        }
        console.log("MySQL Success")
        resolve(connection)
    })
})


