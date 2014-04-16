var express = require('express')
  , bodyParser = require('body-parser')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , errorHandler =  require('errorhandler')
  , serveStatic = require('serve-static')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes');


function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}


var app = express();

app.set('port', process.env.PORT || 9000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.use(serveStatic(path.join(__dirname, '..', 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/test', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
