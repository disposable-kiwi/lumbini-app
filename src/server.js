const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const path = require('path');
var bodyParser = require('body-parser')
const saltRounds = 10;

const db = knex({
    client:"sqlite3",
    connection:{
        filename: "../lumbini.sqlite3"
    },
    useNullAsDefault:true
});

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/register", async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        await db('users').insert({firstName:firstName, lastName:lastName, email:email,password:hash});
        res.status(200).json('All Good!');
    }catch(error){
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    }
});

app.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await db('users').first("*").where({email:email});
        if(user){
            const validPass = await bcrypt.compare(password, user.password);
            if(validPass){
                //in here is where you would send a cookie or token for authentication
                res.status(200).json("You're logged in!")
            }else{
                res.json("Username and Password do not match.")
            }
        }else{
            res.status(404).json("User does not exist.");
        }
    }catch(error){
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    }
});

const port = process.env.PORT || 2218;

app.listen(port,()=>{console.log("Server is successfully open on PORT 2218.")})