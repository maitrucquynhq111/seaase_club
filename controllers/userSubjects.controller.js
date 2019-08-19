'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { Users, Subjects, UserSubjects } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.findBySubjectId = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    UserSubjects.find({
        subjectId: id
    })
    .then(result_find_subject => {
        res.json({ success: true, data: result_find_subject, err: null, message: null })  
        // let promise = []
        // if(result_find_subject.length > 0){
        //     result_find_subject.forEach(element => {
        //         promise.push(
        //             Users.findOne({
        //                 _id: element.userId
        //             })
        //         )
        //     })
        //     Promise.all(promise)
        //     .then(result_find_user => {
        //         let result = result_find_subject.map((item, index)=> {
        //             item.userDetail = result_find_user[index]
        //             console.log(result_find_user[index]);
        //             console.log(item);
        //             return item
        //         })
        //         // console.log(result);
        //         res.json({ success: true, data: result, err: null, message: null })  
        //     })
        //     .catch(err => {
        //         res.json({ success: false, data: null, err: err, message: err.message })
        //     })
        // }
        // else{
        //     res.json({ success: true, data: [], err: null, message: null })
        // }
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}
exports.findByUserId = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    UserSubjects.find({
        userId: id
    })
    .then(result => {
        res.json({ success: true, data: result, err: null, message: null }) 
        // let promise = []
        // if(result.length > 0){
        //     result.forEach(element => {
        //         promise.push(
        //             Subjects.findOne({
        //                 _id: element.subjectId
        //             })
        //         )
        //     })
        //     Promise.all(promise)
        //     .then(result_find_subject => {
        //         console.log(result_find_user);
        //         res.json({ success: true, data: result_find_subject, err: null, message: null })  
        //     })
        //     .catch(err => {
        //         res.json({ success: false, data: null, err: err, message: err.message })
        //     })
        // }
        // else{
        //     res.json({ success: true, data: [], err: null, message: null })
        // }
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}