var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//upload file path
const FILE_PATH = 'uploads';

//configure multer
const upload = multer({
  dest: '${FILE_PATH}/'
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {

  try{
    const file = req.file

    //check if the file is available
    if (!file) {
      res.status(400).send({
        status: false,
        data: 'No file is specified'
      })
    }else {
      //send json response
      res.json(
        {
          name: file.originalname,
          type: file.mimetype,
          size: file.size
        }
      )
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
