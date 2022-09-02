const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const saltRounds = 10;

const db = knex({
    client:"sqlite3",
    connection:{
        filename: "lumbini.sqlite3"
    }
});

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/register", (req,res)=>{
    try{
        
    }catch(error){
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    }
});

const port = process.env.PORT || 2218;

app.listen(port,()=>{console.log("Server is successfully open.")})