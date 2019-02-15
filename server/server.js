const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

app.get('/tweets', function (req, res) {
    res.send( {express: 'Hi from Express server'})
    // perform search here
})