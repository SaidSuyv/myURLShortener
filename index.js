require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}),bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  dns.lookup('google.com',(err,add,family)=>{
    console.log({address:add,fam:family});
  });
  res.send('a');
});

var SHORT = [];

app.post('/api/shorturl',(req,res)=>{
  var {url} = req.body;
  if(/(http:\/\/|https:\/\/)(w{3}\.|).+/.test(url))
  {
    var short = {original_url:url,short_url:Math.floor(Math.random()*10000)+1};
    SHORT.push(short);
    res.json(short);
  }
  else res.json({error:'invalid url'});
});

app.get('/api/shorturl/:id',(req,res)=>{
  var {id} = req.params;
  for(shortCurrent of SHORT)
  {
    if(shortCurrent.short_url == id) res.redirect(shortCurrent.original_url);
    else continue;
  }
  res.json({error:'Hubo un error redirijiendod tu pagina.'});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
