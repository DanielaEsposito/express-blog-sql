//! config enviroment variables
require ("dotenv").config();

//! configurazione express
// init express
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.HOST_PORT;
const domain =process.env.HOST_DOMAIN;

//! MIDDLEWERES
const errorHandler = require("./middleware/errorHandler.js");
const notFound = require("./middleware/notFound.js");
//jason parser for body request
app.use (express.json());
// serving public folder
app.use(express.static('public'));
//va messo sopra le rotte 
app.use(cors({
    origin: 'http://localhost:5173' 
}))


//!ROUTERS

// importo file rotte nella cartella routers
const postsRouter = require("./routers/posts.js");

app.use("/posts", postsRouter);

// app.get('/',(req, res)=> {
//     res.send ("server del mio blog")
// })
// ;

//! ERROR HENDLER
app.use(errorHandler);
app.use(notFound);
// start listening
app.listen(port ,()=>{
    console.log(`App listening at ${domain}${port}`);
    
})
