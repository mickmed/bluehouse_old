const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/api', routes);




const port = process.env.port || 3000
app.listen(port, ()=>console.log(`listening on port ---> ${port}`));