import { bootstrap } from './config/bootstrap';
import { routes } from './config/routes';

const bodyParser = require('body-parser')

var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

app.listen(3000, function () {
  console.log('Google connector app listening 3000!');
});