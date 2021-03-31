const { User } = require('../models');

// TODO: When ready to implement Auth and user management
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // Bypass mongo
            async function TODO_LATER() {
                // Testable:
                // Switch comment on/of depending on if you are testing in graphQL playground where you don't want a logged in user. 
                // Then it'd use the seed user "test"

                // if(true) {
                if (context.user) {
                    // const foundUser = await User.findOne({ username: "test" }).select("-password");
                    const foundUser = await User.findOne({ _id: context.user._id }).select("-password");
                    return foundUser;
                }

                throw new AuthenticationError('You need to be logged in!');
            } // todo

            // Mock
            return {
                data: {
                    _id: null,
                    username: "fake-user",
                    email: "fake-email@domain.com"
                }
            }

        }, // query.me
        trending: async (parent, args, context) => {
            // Mock
            // Mock Note: If you want to edit mocks, make sure you have unique IDs. Otherwise, useQuery will not return the other objects pass the first object.
            // Later Note: Please remember the useQuery hook will return a nested object: data?.trending which is the array
            return [
                {
                    _id: 1,
                    asset: "http://via.placeholder.com/300x300?text=Reprint 1"
                },
                {
                    _id: 2,
                    asset: "http://via.placeholder.com/300x500?text=Reprint 2"
                },
                {
                    _id: 3,
                    asset: "http://via.placeholder.com/300x300?text=Reprint 3"
                },
                {
                    _id: 4,
                    asset: "http://via.placeholder.com/300x300?text=Reprint 4"
                },
                {
                    _id: 5,
                    asset: "http://via.placeholder.com/300x500?text=Reprint 5"
                }
            ]
        } // query.trending
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {

            // Find if email exists
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('That user does not exist');
            }

            // See if plain passwords match
            if (password !== user.password) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // Then sign the token, aka combine user identifiers and exp to generate a JWT
            const token = signToken(user);
            return { token, user };
        }

    } // Mutation
};

module.exports = resolvers;