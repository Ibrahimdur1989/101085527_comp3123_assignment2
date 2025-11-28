
const mongoose = require('mongoose');

// employee schema
const employeeSchema = new mongoose.Schema({
    // employee details 
    first_name:      { type: String, required: true },
    last_name:       { type: String, required: true },
    email:           { type: String, required: true, unique: true },
    position:        { type: String, required: true },
    salary:          { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    department:      { type: String, required: true },

     profileImage:    { type: String}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// export model
module.exports = mongoose.model('Employee', employeeSchema); 