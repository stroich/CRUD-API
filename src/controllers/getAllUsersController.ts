import http from 'http';
import { myUserServices } from '../services/usersServices';

export function getAllUsersController(res: http.ServerResponse) {
  const allUser = myUserServices.getAllUsers();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(allUser));
  res.end();
}
