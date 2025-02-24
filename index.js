const express = require('express');
const { resolve } = require('path');

const mongoose = require('mongoose');
require('dotenv').config();

const menu = require('./itemModel');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('Database connected..!');
})
.catch((err)=>{
  console.log('Connection failed', err);
})

const app = express();
app.use(express.json())
const port = process.env.Port || 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu', async (req, res)=>{
  
  try {
    const {name, description, price}= req.body;
    if (!name || !description || !price){
      return res.status(400).json({msg : 'Bad request'});
    }
  
    const newmenu = new menu({name, description, price});
    await newmenu.save();
    res.status(201).json({
      sucess: true,
      message: 'Item added successfuly'
    })
  } catch (error) {
    console.log(error)
  }



})

app.get('/menu', async (req, res)=>{
  try{
    const data = await menu.find();
    res.json(data);
  }
  catch(err){
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
