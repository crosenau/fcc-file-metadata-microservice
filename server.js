'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('Method:' ,req.method, '\nPath:', req.path, '\nBody:', req.body);
  next();
});

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.post('/', upload.single('upfile'), (req, res) => {
  console.log(req.file);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
