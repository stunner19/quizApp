const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// DB setup
const uri = "mongodb+srv://HaleBopp:rd9eaBmogAW9VQf2@clusterquiz.izeql.mongodb.net/quizdb?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology : true, useNewUrlParser: true})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type : '*/*'}));
app.use(express.static(path.join(__dirname,'client/build')))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
router(app);

// Server setup
const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port ' + port);