'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { Semesters } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res) {
    let entity = req.body;
    
    entity.createdAt = new Date().getTime();
    entity.updatedAt = entity.createdAt;
    Semesters.create(_pick(entity, ['name', 'isCurrent', 'createdAt', 'updatedAt']))
    .then(result => {
        res.json({ success: true, data: result, err: null, message: null})
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
        ]
    }

    Semesters.find(query).countDocuments().then((sum) => {
        Semesters.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (list) {
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
    //     ]
    // }

    Semesters.find().countDocuments().then((sum) => {
        Semesters.find().sort({ createdAt: -1 }).then(function (list) {
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
    Semesters.findOne({
        _id: id
    })
    .then(result => {
        if (result) {
            if(entity.isCurrent){ // update isCurrent=true => set tất cả isCurrent khác về false
                Semesters.updateMany({},{
                    $set: {isCurrent: false}
                })
                .then(update_many => {
                    Semesters.findOneAndUpdate({
                        _id: id,
                    }, {
                        $set: _pick(entity, ['name', 'isCurrent', 'updatedAt'])
                    })
                    .then(result_update => {
                        res.json({ success: true, data: result_update, err: null, message: null })
                    })
                    .catch(err => {
                        res.json({ success: false, data: null, err: err, message: err.message })
                    })
                })
                .catch(err_update_many => {
                    res.json({ success: false, data: null, err: err_update_many, message: err_update_many.message })
                })
            }
            else{
                Semesters.findOneAndUpdate({
                    _id: id,
                }, {
                    $set: _pick(entity, ['name', 'isCurrent', 'updatedAt'])
                })
                .then(result_update => {
                    res.json({ success: true, data: result_update, err: null, message: null })
                })
                .catch(err => {
                    res.json({ success: false, data: null, err: err, message: err.message })
                })
            }
        }
        else {
            res.json({ success: false, data: null, err: language('vi').semesterNotFound, message: language('en').semesterNotFound })
        }
    })
    .catch(err => {        
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.delete = function (req, res) {
    let { id } = req.params;
    let entity = req.body;
    Semesters.findOne({
        _id: id
    })
    .then(result => {
        if (result) {
            Semesters.deleteOne({
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
            res.json({ success: false, data: null, err: language('vi').semesterNotFound, message: language('en').semesterNotFound })
        }
    })
    .catch(err => {        
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.deleteMany = function (req, res) {
    let entity = req.body;
    
    Semesters.deleteMany({
        _id:{
            $in: entity.data
        }
    })
    .then(result_delete => {
        res.json({ success: true, data: result_delete, err: null, message: null })
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}