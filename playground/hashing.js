const jwt = require('jsonwebtoken')

let data = {
    id: 4
}

let token = jwt.sign(data, '123228j')
console.log(token)

let decoded = jwt.verify(token, '123228j')
console.log(decoded) 