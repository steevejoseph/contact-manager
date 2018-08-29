var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: {type:String, default: 'Last Name'},

    // email validation will be done on frontend.
    email: String,
    username: String,

    // hashed password
    password: String,
    birthday: Date,
    contacts: [{type:mongoose.Schema.Types.ObjectId, ref:'Contact'}]
});

module.exports = mongoose.model('User', userSchema);
