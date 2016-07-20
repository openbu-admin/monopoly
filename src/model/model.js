/**
 * Created by timfoxmf on 19/07/2016.
 */
'use strict';

var mongoose = require('mongoose');

var PlayerSchema =  new mongoose.Schema({
    name: String,
    deposit: Number,
    bank: Boolean
});

var model = mongoose.model('Player', PlayerSchema);

module.exports = model;
