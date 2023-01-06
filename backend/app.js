const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto');

var con = require('./connect')
var logi = require('./businessLogi')


// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/shorturl/create', (req, res) => {
    if(!req.body?.url) return res.send('url is not empty');
    const url = req.body.url;
    const shotURL = logi.generateShortUrl(url);
    return res.json(shotURL);
})

app.get('/shortcut/read', (req, res) => {
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

