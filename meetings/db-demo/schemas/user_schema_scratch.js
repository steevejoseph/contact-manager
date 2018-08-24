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

var User = mongoose.model('User', userSchema);

var user1 = new User({
    firstName: "Richard",
    lastName: "Leinecker",
    email:"ricklein@ucf.edu",
    username:"ricklein",
    password:"picklerick",
    birthday: Date.now(),
    contacts: []
});

user1.save(function(err, new_user){
    if(err) console.log(err);
    else console.log("New user added!\n" + new_user.toString());
});
