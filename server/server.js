const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

const newUser = new User({
    email: 'my@gg.gg'
})

newUser.save().then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
});


