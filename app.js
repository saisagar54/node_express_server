const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
//Create a express app with following command
const app = express();
mongoose.connect('mongodb://localhost:27017/NoteBook').
  catch(error => handleError(error));

async function run() {
    try {
            await mongoose.connect('mongodb://localhost:27017/NoteBook');
        } catch (error) {
              handleError(error);
            }
}

run();

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
   /* const notes = [
        {
            title: "First Post from server",
            subject:"first Sub",
            content: "First post content from server"
        }
       
    ]*/
    //res.send("Hello from improved server!");
    Post.find().then(documents => {
       res.status(200).json({
        message: "Notes received successfully",
        notes: documents
    });
}); 
});

app.post('/api/notes',(req, res)=>{
    //const note = req.body;
    const post = new Post({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content
    });
    console.log('*******Note Received', post);
    /*post.save();
    res.status(201).json({
        message:"Notes stored successfully"
    });*/

    post.save().then(createdPost => {
        res.status(201).json({
          message: "Note added successfully",
          noteId: createdPost._id
        });
    });
});


app.delete('/api/notes/:id', (req, res)=>{
    console.log("Note deleted Successfully");
    res.status(200).json({message: "Note deleted successfully!"})
});


// we want to use this app in server. to do that we need export it
module.exports = app;

//import it in server.js