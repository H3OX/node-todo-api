const app = require('express')()
const bodyParser = require('body-parser')
const _ = require('lodash')

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

app.delete('/todos/:id', (request, response) => {
    let id = request.params.id
    if(!ObjectID.isValid(id)) {
        response.status(404).send({})
    }
    else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if(!todo) {
                response.status(404).send()
            } else {
                response.send({todo})
            }
        }).catch((err) => {
            console.log(err)
        })
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


app.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(id)) {
        res.status(404).send({})
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    }
    else {
        body.completed = false
        body.completedAt = null
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => {
        console.log(err)
    })
})




module.exports = {app}
