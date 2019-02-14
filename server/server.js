const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tweets', function (req, res) {
    
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });