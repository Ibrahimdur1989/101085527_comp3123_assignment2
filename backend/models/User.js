
const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({

    // basic info 
    username: { type: String, required: true, trim: true, unique: true },
    email:    { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// export model
module.exports = mongoose.model('User', userSchema);