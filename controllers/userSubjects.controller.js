'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { UserSubjects } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res) {
    let entity = req.body;
    
    entity.createdAt = new Date().getTime();
    entity.updatedAt = entity.createdAt;
    UserSubjects.create(_pick(entity, ['userId', 'subjectId', 'semester', 'scores', 'professor', 'createdAt', 'updatedAt']))
    .then(result => {
        res.json({ success: true, data: result, err: null, message: null})
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.findBySubjectId = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    UserSubjects.find({
        subjectId: id
    })
    .then(result_find_subject => {
        res.json({ success: true, data: result_find_subject, err: null, message: null })  
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}
exports.findByUserId = function (req, res) {
    let { id } = req.params;
    UserSubjects.find({
        userId: id
    })
    .then(result => {
        res.json({ success: true, data: result, err: null, message: null }) 
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}
exports.delete = function (req, res) {
    let { id } = req.params;
    UserSubjects.findOne({
        _id: id
    })
    .then(result => {
        if (result) {
            UserSubjects.deleteOne({
                _id: id,
            })
            .then(result_delete => {
                res.json({ success: true, data: result_delete, err: null, message: null })
            })
            .catch(err => {
                res.json({ success: false, data: null, err: err, message: err.message })
            })
        }
        else {
            res.json({ success: false, data: null, err: language('vi').userNotFound, message: language('en').userNotFound })
        }
    })
    .catch(err => {        
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}