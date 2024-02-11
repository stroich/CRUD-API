import http from 'http';
import dotenv from 'dotenv';
import { getAllUsersController } from './controllers/getAllUsersController';
import { getUserController } from './controllers/getUserController';
import { getNotFoundController } from './controllers/getNotfoundController';
import { createUserController } from './controllers/createUserController';
import { updateUserController } from './controllers/updateUserController';
import { deleteUserController } from './controllers/deleteUserController';

dotenv.config();

const PORT = process.env.PORT;

export const myServer = http.createServer(async (req, res) => {
  try {
    const urlParts = req.url.split('/');
    const userId = urlParts[3];

    if (req.url === '/api/users' && req.method === 'GET') {
      getAllUsersController(res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      await createUserController(res, req);
    } else if (req.url === `/api/users/${userId}` && req.method === 'GET') {
      getUserController(res, userId);
    } else if (req.url === `/api/users/${userId}` && req.method === 'PUT') {
      updateUserController(res, userId, req);
    } else if (req.method === 'DELETE' && req.url === `/api/users/${userId}`) {
      deleteUserController(res, req, userId);
    } else {
      getNotFoundController(res, 'Not Found');
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
