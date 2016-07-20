/**
 * Created by timfoxmf on 19/07/2016.
 */
'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/monopoly', function (err){

    if (err){

        console.log('Failed connecting to Mongodb!');
    } else {
        console.log('Successfully connected to DB');
    }
});