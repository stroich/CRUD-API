import http from 'http';
import dotenv from 'dotenv';
import { UsersService } from './services/usersServices';
import { getAllUsersController } from './controllers/getAllUsersController';

dotenv.config();

const PORT = process.env.PORT;
const myUserServices = new UsersService();
const user1 = {
  username: 'Sasha',
  age: 34,
  hobbies: [],
};
const user2 = {
  username: 'Pasha',
  age: 35,
  hobbies: [],
};
myUserServices.addUser(user1);
myUserServices.addUser(user2);

const myServer = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    const allUser = myUserServices.getAllUsers();
    getAllUsersController(res, allUser);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>The users not found</h1>');
    res.end();
  }
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
