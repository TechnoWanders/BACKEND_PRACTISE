const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 2000;
app.use(express.json());

app.use(express.static(path.join(__dirname, "src/html")));

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname,"/html","index.html"));
});
  
app.get('/api/data', (req, res)=>{
      res.json({message: "hello from the other side!"});
});

app.post('/send-data',(req, res)=>{
      //console.log(req.body);
      const dataWrite = JSON.stringify(req.body, null, 2);
      fs.appendFile("example.txt", dataWrite, (err)=>{
        if(err) throw err;
        console.log("File created and data written!");
      });
      res.json(req.body.message);
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
});