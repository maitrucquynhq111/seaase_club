'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { Users, UserSubjects, Teachers } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res) {
    let entity = req.body;
    
    entity.createdAt = new Date().getTime();
    entity.updatedAt = entity.createdAt;
    Users.create(_pick(entity, ['name', 'code', 'class', 'email', 'fbLink', 'birthday', 'createdAt', 'updatedAt']))
    .then(result_inser_user => {
        entity.listUserSubject = entity.listUserSubject.map(item => {
            item.userId = result_inser_user._id
            return item
        })
        if(entity.listUserSubject.length > 0){
            let promise = [];
            
            entity.listUserSubject.forEach(item => {
                if(item.professor){
                    Teachers.findOne({name: item.professor})
                    .then(res_find_teacher => {
                        if(!res_find_teacher){
                            promise.push(
                                Teachers.create({name: item.professor})
                            )
                        }
                    })
                }
            })
            Promise.all(promise)
            .then(res_insert_teacher => {
                console.log(res_insert_teacher);
            })
            UserSubjects.insertMany(entity.listUserSubject)
            .then(result_inser_subject => {
                res.json({ success: true, data: result_inser_user, err: null, message: null})
            })
            .catch(err => {
                res.json({ success: false, data: null, err: err, message: err.message })
            })
        }
        else{
            res.json({ success: true, data: result_inser_user, err: null, message: null})
        }
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.getList = function (req, res) {
    let { search, limit, skip } = req.query;
    search = search || '';
    limit = parseInt(limit) || 10;
    skip = parseInt(skip) || 0;
    
    let query = {
        $or: [
            { name: new RegExp(search, 'i') },
            { code: new RegExp(search, 'i') },
        ]
    }
    Users.find(query).countDocuments().then((sum) => {
        Users.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (list) {
            res.json({ success: true, data: { sum: sum, list: list, count: list.length }, err: null, message: null })
        }).catch((err) => {
            res.json({ success: false, data: null, err: err, message: err.message })
        });
    }).catch((err) => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.getAll = function (req, res) {
    let { search, limit, skip } = req.query;
    
    // let query = {
    //     $or: [
    //         { name: new RegExp(search, 'i') },
    //         { code: new RegExp(search, 'i') },
    //     ]
    // }
    Users.find().countDocuments().then((sum) => {
        Users.find().sort({ createdAt: -1 }).then(function (list) {
            res.json({ success: true, data: { sum: sum, list: list, count: list.length }, err: null, message: null })
        }).catch((err) => {
            res.json({ success: false, data: null, err: err, message: err.message })
        });
    }).catch((err) => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.update = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    Users.findOne({
        _id: id
    })
    .then(result => {
        if (result) {
            entity.updatedAt = new Date().getTime();
            Users.findOneAndUpdate({
                _id: id,
            }, {
                $set: _pick(entity, ['name', 'code', 'class', 'email', 'fbLink', 'birthday', 'updatedAt'])
            })
            .then(result_update => {
                res.json({ success: true, data: result_update, err: null, message: null })
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

exports.delete = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    Users.findOne({
        _id: id
    })
    .then(result => {
        if (result) {
            entity.updatedAt = new Date().getTime();
            Users.deleteOne({
                _id: id,
            })
            .then(result_delete => {
                UserSubjects.deleteOne({
                    userId: id
                })
                .then(res_delete => {
                    res.json({ success: true, data: result_delete, err: null, message: null })
                })
                .catch(err => {
                    res.json({ success: false, data: null, err: err, message: err.message })
                })
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

exports.deleteMany = function (req, res) {
    let entity = req.body;
    
    Users.deleteMany({
        _id:{
            $in: entity.data
        }
    })
    .then(result_delete => {
        UserSubjects.deleteMany({
            userId: {
                $in: entity.data
            }
        })
        .then(res_delete => {
            res.json({ success: true, data: result_delete, err: null, message: null })
        })
        .catch(err => {
            res.json({ success: false, data: null, err: err, message: err.message })
        })
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}