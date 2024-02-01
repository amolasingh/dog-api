const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use('/', router);
app.use(cors({origin : "http://localhost:4200"}));

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
});