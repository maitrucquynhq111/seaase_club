const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ModalSchema = new Schema(
{
    name: {type: String, default: ''},
    code: {type: String, default: ''},
    class: {type: String, default: ''},
    email: {type: String, default: ''},
    fbLink: {type: String, default: ''},
    birthday: {type: String, default: ''},
    createdAt: {type: Number, default: new Date().getTime()},
    updatedAt: {type: Number, default: new Date().getTime()},
});
// ModalSchema.index({title: 'text', slug: 'text', description: 'text'});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", ModalSchema);