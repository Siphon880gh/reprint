const db = require('../config/connection');
const { User } = require('../models');
const printf = require("util").format;

db.once('open', async() => {
    // Reset model
    await User.deleteMany({});

    // Create initial user for testing purposes
    // TODO: Add in more fields based on Aidan's diagram if needed
    await User.collection.insertOne({
        username: "test",
        email: "test@test.com",
        password: "test"
    });

    // Signal to developer that seeding finished
    const bgGreen = '\x1b[32m',
        colorReset = "\x1b[0m";

    console.info(printf('%sUser created! %s %s'), bgGreen, "test@test.com / test", colorReset);
    process.exit(0);
});