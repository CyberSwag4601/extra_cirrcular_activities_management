const express = require('express'); 
const cors = require('cors')
const app = express()
const routes=require('../routes/routes')
let bodyParser = require('body-parser')
const port = process.env.port|| 3008;
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());
app.use(cors());

app.use('/',routes)

app.listen(port,()=>{
    console.log('Server listening on port 3008')
})

