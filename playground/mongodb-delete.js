const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        console.log('Unable to connect to mongodb')
    }
    console.log('Connection successful')

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c51e813ba6902117d47714d')})
    .then((res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })

    db.close()
})