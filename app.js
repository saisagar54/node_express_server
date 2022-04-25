const express = require("express");
const bodyParser = require('body-parser');
//Create a express app with following command
const app = express();
app.use(bodyParser.json());

/*express is a chain of middlewares, that we apply to the incoming requests. Each part of the funnel can do something with the request
//It could read it, manipulate it, or do something with response,send response.

// We add that middleware with following
//use function takes 3 arguments
//If you use next function then request will continue it's journey
app.use((req, res, next)=>{
   console.log('Server is running');
    next();
});

app.use((req, res, next)=>{
    res.send('Hello from express! Welcome Saisagar');
});*/

app.use((req, res, next)=>{
    //this means no matter which domain sending request it is allowed to access server
    res.setHeader("Access-Control-Allow-Origin","*");
    // allow types of headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    //allow methods that we want to make accessible
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,DELETE,OPTIONS");
    next();
});
app.get('/api/notes',(req, res)=>{
    const notes = [
        {
            title: "First Post from server",
            subject:"first Sub",
            content: "First post content from server"
        }
       
    ]
    //res.send("Hello from improved server!");
    res.status(200).json({
        message: "Notes received successfully",
        notes: notes
    });
});

app.post('/api/notes',(req, res)=>{
    const note = req.body;
    console.log('*******Note Received', note);
    res.status(201).json({
        message:"Notes stored successfully"
    });
});



// we want to use this app in server. to do that we need export it
module.exports = app;

//import it in server.js