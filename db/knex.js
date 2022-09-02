const knex = require('knex');

const connectedKnex = knex({
    client:"sqlite3",
    connection:{
        filename: "lumbini.sqlite3"
    }
});

export default connectedKnex;