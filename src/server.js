const express = require('express');
const cors = require("cors");
const DataHandler = require("./helpers/data_handler");

const app = express();
const port = process.env.PORT || 6660;

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.listen(port, () => console.log(`Listening on port ${port}`));

let data = null;
let filename = "";
const handler = new DataHandler();

app.post('/api/set_data', (req, res) => {
    data = req.body.data;
    filename = req.body.filename;
    res.send();
});

app.post('/api/get_data', (req, res) => {
    if (!data) {
        res.send();
        return;
    }
    const pos = req.body.pos;
    const count = req.body.count;
    handler.handle(data, pos, count)
        .then(data => res.json({data: data, filename: filename}));
});
