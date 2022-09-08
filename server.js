require('dotenv').config()
const express = require('express');
const session = require('express-session');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const withAuth = require('./middleware');
const { ConstructionOutlined } = require('@mui/icons-material');

const saltRounds = 10;

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./lumbini.sqlite3"
    },
    useNullAsDefault: true
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        };
        let createdUser = await db('users').insert({ firstName: firstName, lastName: lastName, email: email, password: hash });
        console.log(createdUser);
        let token = jwt.sign({ userId: createdUser[0] }, process.env.SECRET, { expiresIn: 604800 });
        // res.status(200).json('All Good!');
        // res.status(200).json({token:token});
        res.cookie('token', token, { httpOnly: true, maxAge: 60*60*24*30*1000});
        res.json({token, userId:createdUser[0]});
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    } finally {

    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db('users').first("*").where({ email: email });
        console.log(user);
        if (user) {
            const validPass = await bcrypt.compare(password, user.password);
            console.log(validPass);
            if (validPass) {
                //in here is where you would send a cookie or token for authentication
                const payload = { userId: user.id };
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 604800
                });
                console.log(token);
                //creating a cookie that has contents that have a 'token' key whose value is set to the token we just created of the user
                //so the cookie looks like this {'token': contentsOftheTokenGeneratedAbove }
                res.cookie('token', token, { httpOnly: true, maxAge: 60*60*24*30*1000});
                //send an Object back that has two things, the token and the userId for the login
                res.json({token, userId:user.id});
            } else {
                res.status(401).json({alert:"Username and Password do not match."});
            }
        } else {
            res.status(404).json({alert:"User does not exist."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({alert:"Oops, something went wrong on our end!"});
    }
});

app.get('/getcookie', (req,res)=>{
    //req.cookies accesses the cookie we just stored or that we already have stored
    //and since, remember, cookies is an Object with a 'token' attribute, if we want to
    //access the stored token, we'll have to reference that with dot notation

    //the way tokens work is that we have a token saved on the frontend and a token
    //saved on the backend and we have to check to see if both tokens match before doing
    //anything or authorizing anyone
    res.send(req.cookies.token);
});

app.post('/signout', )


app.get('/checkToken', withAuth, function(req,res){
    res.status(200).json({token:req.cookies.token, userId:req.userId});
});

app.get('/posts/:id', async (req, res) => {
    try {
        const allPosts = await db('posts').where("user_id", req.params.id).select("*");
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and posts could not be loaded! It looks like: ${error}`);
    }
});

app.post("/createPost", withAuth,async (req, res) => {
    try {
        console.log(req.userId)
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            authorEmail: req.body.authorEmail
        };
        await db('posts').insert(newPost);
        res.status(200).json('You\'ve made a new post!');
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and your post could not be added! It looks like: ${error}`);
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        await db('posts').where("id", req.params.id).del();
        res.status(200).json("Your post was successfully was deleted!").redirect("/all");
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and your post was not deleted! It looks like: ${error}`);
    }
});

process.on('SIGINT', () => {
    db.destroy();
});

const port = process.env.PORT || 2218;

app.listen(port, () => { console.log("Server is successfully open on PORT 2218.") })