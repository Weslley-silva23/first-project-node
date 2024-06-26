const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

const users = [];


const checkeruserid = (request, response, next) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.id === id);

    if (index < 0) {
        return response.status(404).json({ message: "user not found" });
    }

    request.userindex = index;
    request.userid = id;
    next();
};

app.get('/users', (request, response) => {
    console.log("GET /users called");
    return response.json(users);
});

app.post('/users', (request, response) => {
    const { name, age, city } = request.body;
    const user = { id: uuid.v4(), name, age, city };
    users.push(user);

    console.log("User added:", user);
    return response.status(201).json(user);
});

app.put('/users/:id', checkeruserid, (request, response) => {
    const index = request.userindex;
    const { name, age, city } = request.body;
    const id = request.userid;
    const updateuser = { id, name, age, city };

    users[index] = updateuser;
    return response.json(updateuser);
});

app.delete('/users/:id', checkeruserid, (request, response) => {
    const index = request.userindex;
    users.splice(index, 1);
    return response.status(204).json();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

