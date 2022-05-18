const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');

const app = express();

//middleware
const fileUploadRouter = require('./routes/fileUploadRoutes');
const pathLogger = require('./middleware/path-logger');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json());
app.use(fileUpload({
  useTempFiles:true,
  safeFileNames: true,
  preserveExtension: true,
  createParentPath:true
}));
app.use(pathLogger);

//routes
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api',fileUploadRouter);

//error handler
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
