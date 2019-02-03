const expect = require('expect')
const request = require('supertest')

const { app } = require('../server')
const { Todo } = require('../models/todo').default

beforeEach((done) => {
    Todo.remove({}).then(() => done())
})

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
      let text = 'Test todo text'
      request(app).post('/todos').send({text}).expect(200).expect((res) => {
          expect(res.body.text).toBe(text) 
      })
      .end((err, res) => {
          if(err) {
              return done(err)
          }
          Todo.find().then((docs) => {
              expect(docs.length).toBe(1)
              expect(docs[0].text).toBe(text)
              done()
          }).catch(err => {
              done(err)
          })
      })
  })

  it('Should not create a todo with invalid body data', (done) => {
      request(app).post('/todos').send({}).expect(400)
      .end((err, res) => {
          if(err) {
              return done(err)
          }
          Todo.find().then((docs) => {
              expect(docs.length).toBe(0)
              done()
          }).catch(err => {
              done(err)
          })
      })
  })
})
