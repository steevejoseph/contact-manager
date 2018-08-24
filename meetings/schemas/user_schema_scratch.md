var userSchema = new Schema({
    first_name: String,
    last_name: {type:String, default: 'Last Name'},

    // email validation will be done on frontend.
    email:String,
    username:String,

    // hashed password
    password:String,
    birthday:Date
    contacts[]
});

var userModel = mongoose.model('User', userSchema);

var user = new userModel({
    first_name: "Richard",
    last_name: "Leinecker",
    email:"ricklein@ucf.edu",
    username:"ricklein",
    password:"picklerick",

    // formatting JS Date
    // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    birthday:today.toLocaleDateString("en-US");
});

user.save(function(err, new_user)){
    if(err) console.log(err);
    else console.log("New user added!\n" + new_user.toString());
}
