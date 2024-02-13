import http from 'http';
import { myUserServices } from '../services/usersServices';

export function getAllUsersController(res: http.ServerResponse) {
  try {
    const allUser = myUserServices.getAllUsers();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(allUser));
    res.end();
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}
