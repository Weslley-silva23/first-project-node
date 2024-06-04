const express = require('express');
const uuid = require('uuid')
const cors = require('cors');

const port = 3001;
const app = express()
app.use(express.json())
app.use(cors())

const users = []

const checkeruserid = (Request, response, next ) => {
  const { id } = Request.params

  const index = users.findIndex(user => user.id === id)

  if (index < 0) {
    return response.status(404).json({ message: "user not found" })
  }

  Request.userindex = index
  Request.userid = id

  next()

}


app.get('/users', (request, response) => {


  return response.json(users)
})

app.post('/users', (request, response) => {

  const { name, age, city } = request.body

  const user = { id: uuid.v4(), name, age, city }

  users.push(user)

  return response.status(201).json(user)
})

app.put('/users/:id', checkeruserid, (request, response) => {

  const index = request.userindex
  const { name, age, city } = request.body
  const id = request.userid

  const updateuser = { id, name, age, city }

  

  users[index] = updateuser


  return response.json(updateuser)
})

app.delete('/users/:id',checkeruserid, (request, response) => {

  const index = request.userindex

  users.splice(index, 1)

  return response.status(204).json()
})

