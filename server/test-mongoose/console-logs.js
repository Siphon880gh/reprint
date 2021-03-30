const mongoose = require('mongoose');
const { User } = require("../models");

async function consoleLogs() {
    users = await User.find({}).populate("reprints").select("-__v -password");
    console.log(users);
}

async function consoleLogs2() {
    console.log("Placeholder for server/test-mongoose/console-logs.js -> consoleLogs2()");
}


module.exports = { 
    consoleLogs,
    consoleLogs2 
};