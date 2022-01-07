const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    bio: {
        type: String,
        required: true,
    },
    social: {
        facebook: {
            type: String,
        },
        github: {
            type: String,
        },
        twitter: {
            type: String,
        },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', ProfileSchema);