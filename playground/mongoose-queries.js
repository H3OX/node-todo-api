const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { ObjectID } = require('mongodb')
const { User } = require('../server/models/user')

const id = '5c546f3c125ebe205458c4f4'

 



User.findById(id).then((user) => {
    if(!user) {
        console.log('No such user')
    }
    console.log('UserID:', user)
}).catch((e) => {
    console.log(e)
})