import http from 'http';
import { myUserServices } from '../services/usersServices';
import { validate as uuidValidate } from 'uuid';
import { getNotFoundController } from './getNotfoundController';

export function getUserController(res: http.ServerResponse, userId: string) {
  try {
    const allUsers = myUserServices.getAllUsers();
    const isUser = allUsers.find((user) => user.id === userId);

    if (uuidValidate(userId, { version: '4' })) {
      if (isUser) {
        const user = myUserServices.getUserById(userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
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
