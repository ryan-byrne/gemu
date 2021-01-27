const express = require('express');
const app = express();

app.get('*', (req,res) => {
  var games = require('./games.json');
  const gameId = req.url.substring(1);
  var game = (gameId in games.active) ? games.active[gameId] : null
  res.send(game);
});

app.listen(5000, () => {
  // Switch to mongoDC
  console.log('Running Server');
});
