require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var SHORT = [];

app.post('/api/shorturl',bodyParser.urlencoded({extended:true}),bodyParser.json(),(req,res)=>{
  var shortUrl = {original_url:req.body.url,shorturl:Math.floor(Math.random()*10000)+1};
  SHORT.push(shortUrl);
  res.json(shortUrl);
});

app.get('/api/shorturl/:id',(req,res)=>{
  var {id} = req.params;
  for(shortCurrent of SHORT)
  {
    if(shortCurrent.shorturl == id) res.redirect(shortCurrent.original_url);
    else continue;
  }
  res.json({error:'Hubo un error redirijiendod tu pagina.'});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
