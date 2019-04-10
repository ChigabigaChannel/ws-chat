const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.ws('/chat', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);

    ws.send('Test response')
  })
})

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))