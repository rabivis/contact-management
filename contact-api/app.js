var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var AWS = require('aws-sdk');

var indexRouter = require('./routes/index');
var contactsRouter = require('./routes/contacts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contacts/', contactsRouter);

AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'AKIAIVG5ZNNH2BVCTSXA',
  secretAccessKey: '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'
});

var dynamodb = new AWS.DynamoDB();
var params = {
    TableName : "Contacts",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) {
        if(err.code != 'ResourceInUseException') {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        }
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
