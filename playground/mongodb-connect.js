const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, dbObject) => {
    if(err) {
        console.log('Unable to connect to mongoDB')
    } else {
        console.log('Connected to mongoDB');
    }

    dbObject.collection('ToDos').insertOne({
        text: "Something to do",
        completed: false
    }, (err, result) => {
        if(err) {
            console.log('Insert error')
        } else {
            console.log(JSON.stringify(result.ops, undefined, 2))
        }
    });

    dbObject.close();
});
