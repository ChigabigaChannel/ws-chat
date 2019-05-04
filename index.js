const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const WsController = require('./controllers/ws-controller');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.ws('/chat', WsController)

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))