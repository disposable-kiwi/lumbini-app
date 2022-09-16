require('dotenv').config()
const express = require('express');
const Pool = require('pg').Pool
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const withAuth = require('./middleware');

const saltRounds = 10;

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./lumbini.sqlite3"
    },
    useNullAsDefault: true
});

const pool = new Pool({
    user: 'ktu20',
    host: 'localhost',
    database: 'lumbiniDB',
    password: process.env.POSTGRES,
    port: 5432,
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        let createdUser = await db('users').insert({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        });
        let token = jwt.sign({ userId: createdUser[0] }, process.env.SECRET, { expiresIn: 604800 });
        let user = await db('users').where("id", createdUser[0]).select("firstName");
        res.json({ token, userName: user[0].firstName });
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops, something went wrong on our end!");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db('users').first("*").where({ email: email });
        if (user) {
            const validPass = await bcrypt.compare(password, user.password);
            if (validPass) {
                const payload = { userId: user.id };
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 604800
                });
                res.json({ token, userName: user.firstName });
            } else {
                res.status(401).json({ alert: "Username and Password do not match." });
            }
        } else {
            res.status(404).json({ alert: "User does not exist." });
        }
    } catch (error) {
        res.status(500).send({ alert: "Oops, something went wrong on our end!" });
    }
});

app.get('/checkToken', withAuth, async function (req, res) {
    const dbName = await db('users').where("id", req.userId).select("firstName");
    res.status(200).json({ userId: req.userId, userName: dbName[0].firstName });
});

app.get('/posts', withAuth, async (req, res) => {
    try {
        const allPosts = await db('posts').where("user_id", req.userId).select("*");
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ error: `Oops, something went wrong on our end and posts could not be loaded! It looks like: ${error}` });
    }
});

app.post("/createPost", withAuth, async (req, res) => {
    try {
        const dateCreated = new Date();
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            monthCreated: dateCreated.getMonth() + 1,
            dayCreated: dateCreated.getDate(),
            yearCreated: dateCreated.getFullYear(),
            timeCreated: dateCreated.getMinutes() >= 10 ? `${dateCreated.getHours()}:${dateCreated.getMinutes()}` : `${dateCreated.getHours()}:0${dateCreated.getMinutes()}`,
            user_id: req.userId
        };
        const posted = await db('posts').insert(newPost);
        const returnPosted = await db('posts').where("id", posted[0]).select("*");
        res.status(200).json(returnPosted[0]);
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and your post could not be added! It looks like: ${error}`);
    }
});

app.post('/delete/', async (req, res) => {
    try {
        await db('posts').del().where("id", req.body.id);
        res.status(200).json({ success: "Your post was successfully was deleted!" });
    } catch (error) {
        res.status(500).send(`Oops, something went wrong on our end and your post was not deleted! It looks like: ${error}`);
    }
});

process.on('SIGINT', () => {
    db.destroy();
});

const port = process.env.PORT || 2218;

app.listen(port, () => { console.log("Server is successfully open on PORT 2218.") })