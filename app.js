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
var ENVIRONMENT = (process.env.ENVIRONMENT === 'release') ? 'release' : '_source';

// Homepage
app.use('/', express.static(ENVIRONMENT + '/public'));

// Work
app.use('/work', express.static(ENVIRONMENT + '/public'));

// Static CSS & font assets delivery (always deliver built version)
app.use('/css', express.static('release/public/css'));
app.use('/fonts', express.static('release/public/fonts'));

// API Routes
app.use('/api', require('./' + ENVIRONMENT + '/api/routes'));


// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Server started on PORT', PORT);