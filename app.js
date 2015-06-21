/******************************************************************************
 *                          Travel Photo Album App
 ******************************************************************************
 * This app serves an HTML5 app as the frontend to allow public users access
 * to pictures that were uploaded through a private frontend interface.
 *
 * This app also exposes a RESTful API for data manipulation.
 *
**/

// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var path        = require('path');
var api         = require('./app/api');
var routes      = require('./app/routes')
var database    = require('./config/database');     // database configs

var port        = process.env.PORT || 8080;         // If no env var set, DEV mode

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

mongoose.connect(database.url);
mongoose.connection.once('open', function() { console.log('DB Connected!'); });

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');

app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));                             // For request logging

// ----------------------------------------------------------------------------
// Custom Middleware
// ----------------------------------------------------------------------------

app.use(require('./app/middleware/img-upload')());  // Handle the Image uploads

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'public')));                // for the HTML5 app
app.use('/uploads', express.static(__dirname + '/uploads'));    // for imgs

app.use('/api', api);

app.get('/', routes.index);

app.get('/day/:day', routes.dayAlbum)

// ----------------------------------------------------------------------------
// Listen (start app: `node app.js`)
// ----------------------------------------------------------------------------

app.listen(port);
console.log('Server started on port ' + port);