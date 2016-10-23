/// <reference path='../typings/tsd.d.ts' />
import { bootstrap } from './config/bootstrap';

const bodyParser = require('body-parser')

var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

bootstrap(app);

app.listen(3000, function () {
  console.log('Google connector app listening 3000!');
});