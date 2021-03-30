const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: Please fill in more of the User model. Refer to Aidan's diagrams on Slack or OneNote

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    reprints: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reprint'
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return password===this.password;
};

const User = model('User', userSchema);

module.exports = User;
