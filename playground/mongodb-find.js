const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        console.log('Unable to connect to mongodb')
    }
    console.log('Connected to MongoDB server')
    
    db.collection('Users').find({name: 'Frank'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log(err)
    })
    db.close()
})