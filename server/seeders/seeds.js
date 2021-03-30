const db = require('../config/connection');
const { User, Reprint } = require('../models');
const printf = require("util").format;

db.once('open', async() => {
    // Reset model
    await User.deleteMany({});

    await Reprint.deleteMany({});


    // Create initial user for testing purposes
    // TODO: Add in more fields based on Aidan's diagram if needed
    await User.collection.insertOne({
        username: "test",
        email: "test@test.com",
        password: "test",

    });

    await Reprint.collection.insertOne({
        title: "test title",
        asset: "test asset",
        author: "test author",
        caption: "test caption",
        marketListing: "https://testmarketlisting.com",
        likes: [
            {_id: "606281d71935576a90a33a66"}
        ],
        comments: [
            {
                commentBody: "test Comment 1",
                author: "test author 1"
            }
        ]

    });

    // Signal to developer that seeding finished
    const bgGreen = '\x1b[32m',
        colorReset = "\x1b[0m";

    console.info(printf('%Seeds successful! %s %s'), bgGreen, colorReset);
    process.exit(0);
});