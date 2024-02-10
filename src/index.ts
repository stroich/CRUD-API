import http from 'http';
import dotenv from 'dotenv';
import { getAllUsersController } from './controllers/getAllUsersController';
import { getUserController } from './controllers/getUserController';
import { getNotFoundController } from './controllers/getNotfoundController';
import { createUserController } from './controllers/createUserController';

dotenv.config();

const PORT = process.env.PORT;

const myServer = http.createServer(async (req, res) => {
  const urlParts = req.url.split('/');

  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsersController(res);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    await createUserController(res, req);
  } else if (urlParts.length === 4 && req.method === 'GET') {
    getUserController(res, urlParts[3]);
  } else {
    getNotFoundController(res, 'Not Found');
  }
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
