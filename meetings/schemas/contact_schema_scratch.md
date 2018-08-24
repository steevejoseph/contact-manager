var contactSchema = new Schema({

    firstName: String,
    lastName: {type:String, default: 'Last Name'},

    // email validation will be done on frontend.
    mobilePhone:String
    homePhone:String,
    company:String,
    email:String,
    birthday:Date,
});

var Contact = mongoose.model('Contact', contactSchema);

var contact1 = new Contact({
    firstName: "NotRick",
    lastName: "NotLeinecker",

    // email validation will be done on frontend.
    mobilePhone:"0123456789"
    homePhone:"9876543210",
    company:"UCF",
    email:"nrl@ucf.edu",
    birthday: Date.now
});

contact.save(function(err, new_contact)){
    if(err) console.log(err);
    else console.log("New contact added!\n" + new_contact.toString());
}
