const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        console.log(err)
    }
    console.log('Connected to mongoDB');

    db.collection('Users').findOneAndUpdate({name: 'Maria'}, {
        $set: {
            name: 'George'
        },
        $inc: {
            age: 1
        }
    })
    .then((res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })

});