'user strict';
const mongoose = require('mongoose');
const moment = require('moment');
const { Users } = require('../models');
const { language } = require("../language");
const { _pick } = require('../utils/setting');
const ObjectId = mongoose.Types.ObjectId;

exports.create = function (req, res) {
    let entity = req.body;    
    entity.createdAt = new Date().getTime();
    entity.updatedAt = entity.createdAt;
    Users.create(_pick(entity, ['name', 'class', 'email', 'fbLink', 'birthday', 'createdAt', 'updatedAt']))
    .then(result => {
        res.json({ success: true, data: result, err: null, message: null})
    })
    .catch(err => {
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}

exports.getList = function (req, res) {
    let { search, limit, skip, id } = req.query;
    search = search || '';
    limit = parseInt(limit) || 10;
    skip = parseInt(skip) || 0;
    
    let query = {
        $or: [
            { name: new RegExp(search, 'i') },
            { phone: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
        ]
    }
    if(id) query = Object.assign(query, { newsId: id })
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
                $set: _pick(entity, ['name', 'class', 'email', 'fbLink', 'birthday', 'updatedAt'])
            })
            .then(result_update => {
                res.json({ success: true, data: result_update, err: null, message: null })
            })
            .catch(err => {
                res.json({ success: false, data: null, err: err, message: err.message })
            })
        }
        else {
            res.json({ success: false, data: null, err: language('vi').contactsNotFound, message: language('en').contactsNotFound })
        }
    })
    .catch(err => {        
        res.json({ success: false, data: null, err: err, message: err.message })
    })
}