const knex = require("./knex");

function createPost({title,content,authorEmail}){
    const newPost = {
        title:title,
        content:content,
        authorEmail:authorEmail
    };
    return knex("posts").insert(newPost);
}

function getAllPosts(){
    return knex("posts").select("*");
}

function deletePost(id){
    return knex("posts").where("id",id).del();
}

function updatePost(id, post){
    return knex("posts").where("id",id).update(post);
}

module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost
};