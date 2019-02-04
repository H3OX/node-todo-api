const app = require('express')()
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { ObjectID } = require('mongodb')
const port = process.env.PORT || 3000

app.use(bodyParser.json())


app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }), (e) => {
        console.log(e)
    }
})

app.get('/todos/:id', (request, response) => {
    let id = request.params.id
    if(!ObjectID.isValid(id)) {
        console.log('Todo was not found')
        response.status(404).send()
    }
    Todo.findById(id).then((todo) => {
        if(todo) {
            response.send(todo)
        }
        else {
            response.status(404).send({})
        }
    }, (err) => {
        response.status(400).send({})
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


module.exports = {app}
