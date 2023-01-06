const express = require('express')
const app = express()
const port = 3000


var con = require('./connect')
var logi = require('./businessLogi')

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/shorturl/create', (req, res) => {
    if(!req.body?.url) return res.send('url is not empty');
    const url = req.body.url;
    const shotURL = logi.generateShortUrl(url);
    con.then((db)=>{
      db.query("SELECT * FROM urls WHERE LongURL = ? " , [url] , (err,result) =>{
        if (err) {
          console.log(err)
          return res.status(400).send(err);
        }
        if(result.length > 0) {return res.status(200).json( { message : "The URL already exists." })}
        else{
          db.query("INSERT INTO urls(LongURL, ShortURL) VALUES (?,?)",[url,shotURL],(err) => {
            if (err) {
              console.log(err)
              return res.status(400).send();
            }
            return res.status(200).json( { message : "successfully" })
          });
        }
      })
    }).catch((err)=>{return res.send(err)})
})

app.get('/shorturl/read', (req, res) => {
    if(!req.body?.url) return res.send('url is not empty');
    const url =  new String(req.body?.url);
    con.then((db)=>{
        db.query("SELECT * FROM urls WHERE LongURL = ? ",[url.toString()], function (err, result, fields) {
            if (err) throw err;
            return res.json(result)
          });
    }).catch((err)=>{return res.send(err)})
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

