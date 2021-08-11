var express = require('express');
var cors = require('cors');
var formidable = require('formidable');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({ extended: false }));
app.post('/api/fileanalyse', function (req, res) {
  let fileName;
  let fileType;
  let fileSize;
  let resObj = {};
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {

      // Check for and handle any errors here.

      console.error(err.message);
      return;
    }
    //console.log(fields);
    fileName = files.upfile.name;
    fileType = files.upfile.type;
    fileSize = files.upfile.size;
    resObj = {
      name: fileName,
      type: fileType,
      size: fileSize
    }
    //console.log(files);
    console.log(resObj);
    
    //res.writeHead(200, {'content-type': 'text/plain'});
    //res.write('received upload:\n\n');

    // This last line responds to the form submission with a list of the parsed data and files.

    //res.end(util.inspect({fields: fields, files: files}));
    res.json(resObj);
  });
  //return;

  
  
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
