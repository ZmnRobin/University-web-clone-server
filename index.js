const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors=require('cors');
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectID;


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;


// Connection URL
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iygii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const applicationList = client.db("University").collection("apllicationList");
  const teachers = client.db("University").collection("teachers");

  app.post('/applyForm',(req,res)=>{
      const formData=req.body;
      console.log(formData);
      applicationList.insertOne(formData)
      .then(result=>{
          console.log('Data inserted');
          res.json({result:result,message:"Form submitted successfully"});
        })
    });
    
  app.post('/teacher',(req,res)=>{
    const teacherData=req.body;
    teachers.insertOne(teacherData)
    .then(result=>{
        console.log('Data inserted');
        res.json({result:result,message:"Form submitted successfully"});
        })
  });

  app.get('/allTeacher',(req,res)=>{
    teachers.find()
    .toArray((err,teacherList)=>{
      res.send(teacherList);
    })
  });

  app.get('/allApplication',(req,res)=>{
    applicationList.find()
    .toArray((err,applicationList)=>{
      res.send(applicationList);
    })
  });

  app.get('/', (req, res) => {
    res.send("Hey there,server is working perfectly..!");
  });

});

app.listen(process.env.PORT || port)