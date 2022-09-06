require('dotenv').config()
const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');

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
        let token = jwt.sign({ userId: createdUser[0] }, process.env.SECRET, {expiresIn: 604800});
        res.status(200).json('All Good!');
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
        console.log(user.id);
        if (user) {
            const validPass = await bcrypt.compare(password, user.password);
            if (validPass) {
                //in here is where you would send a cookie or token for authentication
                res.status(200).json("You're logged in!")
            } else {
                res.json("Username and Password do not match.")
            }
        } else {
            res.status(404).json("User does not exist.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    }
});

app.get('/posts/:email', async (req, res) => {
    try {
        const allPosts = await db('posts').where("authorEmail", req.params.email).select("*");
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and posts could not be loaded! It looks like: ${error}`);
    }
});

app.post("/createPost", async (req, res) => {
    try {
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