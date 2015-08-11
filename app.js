// =============================================================================
// BASE SETUP
// =============================================================================
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser(), which will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// .env influenced variables
var PORT = process.env.PORT || '8000';
var ENVIRONMENT = (process.env.ENVIRONMENT === 'development') ? '_source' : 'release';

// Homepage
app.use('/', express.static(ENVIRONMENT + '/public'));

// Static CSS asset delivery (always deliver built version b/c it's 1 CSS file)
app.use('/css', express.static('release/public/css'));

// API Routes
app.use('/api', require('./' + ENVIRONMENT + '/db/routes'));


// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(PORT);