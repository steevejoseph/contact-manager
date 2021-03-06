var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({

    firstName: String,
    lastName: {type:String, default: 'Last Name'},
    fullName:String,
    mobilePhone:String,
    homePhone:String,
    company:String,

    // email validation will be done on frontend.
    email:String,
    // birthday:Date,
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Contact', contactSchema);
