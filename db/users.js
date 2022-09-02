const knex = require("./knex");

function createUser({firstName, lastName, email, password}){
    const newUser = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    };
    return knex("users").insert(newUser);
}

function getAllUsers(){
    return knex("users").select("*");
}

function deleteCar(id){
    return knex("users").where("id",id).del();
}

function updateUser(id, user){
    return knex("users").where("id",id).update(user);
}

module.exports = {
    createUser,
    getAllUsers,
    deleteCar,
    updateUser
};