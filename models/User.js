const { Schema, model } = require('mongoose');

// User model will have
// username, string unique, required, trimmed
// email, string, required, unique, must match valid email address
// thoughts (array of _id values referencing the Thought model)
// friends (array of _id values referencing the User model self-reference)

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


// it will also have a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function () {
    if (this.friends) {
        return this.friends.length;
    } else {
        return 0
    }
})

const User = model('User', UserSchema);

module.exports = User;