'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { Teachers } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res) {
    let entity = req.body;
    
    entity.createdAt = new Date().getTime();
    entity.updatedAt = entity.createdAt;
    Teachers.create(_pick(entity, ['name', 'createdAt', 'updatedAt']))
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

    Teachers.find(query).countDocuments().then((sum) => {
        Teachers.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (list) {
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

    Teachers.find().countDocuments().then((sum) => {
        Teachers.find().sort({ createdAt: -1 }).then(function (list) {
            res.json({ success: true, data: { sum: sum, list: list, count: list.length }, err: null, message: null })
        }).catch((err) => {
            res.json({ success: false, data: null, err: err, message: err.message })
        });
    }).catch((err) => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}