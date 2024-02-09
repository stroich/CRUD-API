import http from 'http';
import dotenv from 'dotenv';
import { myUserServices } from './services/usersServices';
import { getAllUsersController } from './controllers/getAllUsersController';
import { getUserController } from './controllers/getUserController';
import { getNotFoundController } from './controllers/getNotfoundController';

dotenv.config();

const PORT = process.env.PORT;

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
  const urlParts = req.url.split('/');

  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsersController(res);
  } else if (urlParts.length === 4 && req.method === 'GET') {
    getUserController(res, urlParts[3]);
  } else {
    getNotFoundController(res, 'Not Found');
  }
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
