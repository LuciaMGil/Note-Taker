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

// Route to home page
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, './public/index.html'))
   
});

// Route to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
 });


// Route to read json file
app.get('/api/notes', (req, res) =>{
   res.json(textData)
});

app.post('/api/notes', (req, res) =>{
   // Gives new note an id
   req.body.id = uniqid();
   var newNote = req.body;
   
   // Adding new note to text data
   textData.push(newNote);

   // Stored notes
   const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
   
   // Add new note to array
   savedNotes.push(newNote);

   fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
   res.status(200).json({added: true});
 
});



 

 

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
});

