import http from 'http';
import { Users } from 'types/types';

export function getAllUsersController(res: http.ServerResponse, allUser: Users) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(allUser));
  res.end();
}
