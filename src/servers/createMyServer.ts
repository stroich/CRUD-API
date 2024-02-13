import http from 'http';
import { getAllUsersController } from '../controllers/getAllUsersController';
import { getUserController } from '../controllers/getUserController';
import { getNotFoundController } from '../controllers/getNotfoundController';
import { createUserController } from '../controllers/createUserController';
import { updateUserController } from '../controllers/updateUserController';
import { deleteUserController } from '../controllers/deleteUserController';

export function createMyServer(port: string, isMulti: boolean, id: number = 0) {
  const myServer = http.createServer(async (req, res) => {
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

  myServer.listen(port, () => {
    const logMessage = isMulti
      ? `Worker ${id} listening on port ${port}`
      : `Server is listening on port ${port}`;
    console.log(logMessage);
  });

  return myServer;
}
