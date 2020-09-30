var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const redis = require('redis');
const rdClient = redis.createClient({
  host: '192.168.0.10',
  port: 6379
});

const app = express();

const clientPath = '../../dist/redis-ws';
const port = 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Client Path
app.use(express.static(clientPath));
app.use('/api', require('./routes/ws.route'));
app.use('/websocket', require('./routes/wss.route'));

const server = require('http').createServer(app);  
const io = require('socket.io')(server);
let ioClients = [];

io.on('connection', client => {
  ioClients.push(client.id);
  ioClients.forEach((item, index) => {
    client.emit('emitClients', { clientIndex: index, clientId: item});
    console.info('Client Index: ', index, 'ClientId: ', item);
  });

  client.on('disconnect', () => {
    let index = ioClients.indexOf(client.id);
    ioClients.splice(index, 1);
    ioClients.forEach((item, index) => {
      console.info('Client Index: ', index, 'ClientId: ', item);
    });
    console.info('----------------------DISCONNECTED--------------------');
  });
  client.on('scroll', yPosition => {
    io.emit('scroll', yPosition);
    console.info(yPosition);
  });
  client.on('sendDOM', client_dom => {
    io.emit('clientDOM', client_dom);
    console.log(client_dom);
  });

  client.on('windowResize', windowSize => {
    io.emit('windowResize', windowSize);
  });
  client.on('request', clientMsg => {
    console.log('Message recieved from client', clientMsg);
    console.info('CLIENT: ', client.id);
  });
});


server.listen(port, () => {
  console.log('Listening on port ' + port);
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
  res.json({
    message: err.message,
    error: err
  });
});

rdClient.on('error', error => {
  console.log('redis Error: ', error);
});

module.exports = app;
