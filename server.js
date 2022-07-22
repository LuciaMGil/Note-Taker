

// The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

// The following HTML routes should be created:

// GET /notes should return the notes.html file.

// GET * should return the index.html file.

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const textData = require('./db/db.json');
const uniqid = require("uniqid");
var PORT = process.env.PORT || 5502;


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static("public"));


// Route to read json file
app.get('/api/notes', (req, res) =>{
   res.json(textData)
});

app.post('/api/notes', (req, res) =>{
   req.body.id = uniqid();
   textData.push(req.body);
   console.log(req.body)
});


// app.post('api/notes', ({body}, res) => {
//    body.id = uniqid();
//    textData.push(body);
//    writeFile(textData, JSON.stringify(textData), err => {
//       if (err) throw err;
//       res.json(textData);
//    })
// })


console.log(textData);
// Route to home page
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, './public/index.html'))
   // console.log(res);
});

// Route to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
 });
 

 

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
});

