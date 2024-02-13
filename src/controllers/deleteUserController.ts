import http from 'http';
import { myUserServices } from '../services/usersServices';
import { validate as uuidValidate } from 'uuid';
import { getNotFoundController } from './getNotfoundController';

export async function deleteUserController(
  res: http.ServerResponse,
  req: http.IncomingMessage,
  userId: string
) {
  try {
    const allUsers = myUserServices.getAllUsers();
    const isUser = allUsers.find((user) => user.id === userId);

    if (uuidValidate(userId)) {
      if (isUser) {
        myUserServices.deleteUserById(isUser.id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      } else {
        getNotFoundController(res, 'User not found');
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid userId' }));
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}
