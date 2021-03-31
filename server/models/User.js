const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: Please fill in more of the User model. Refer to Aidan's diagrams on Slack or OneNote

const favoriteSchema = new Schema(
  {
      reprintId: {
          type: Schema.Types.ObjectId,
          ref: "Reprint"
      },
  },
  {
      toJSON: {
        getters: true,
      },
      id: false,
    }
)

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
    ],
    favorites: [favoriteSchema],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    followed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return password===this.password;
};

// count followers
userSchema.virtual('followerCount').get(function() {
  return this.followers.length;
});

// count followed
userSchema.virtual('followedCount').get(function() {
  return this.followed.length;
});

// count favorites
userSchema.virtual('favoriteCount').get(function() {
  return this.favorites.length;
});

const User = model('User', userSchema);

module.exports = User;
