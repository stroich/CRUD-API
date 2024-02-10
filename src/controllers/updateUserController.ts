import http from 'http';
import { myUserServices } from '../services/usersServices';
import { validate as uuidValidate } from 'uuid';
import { getNotFoundController } from './getNotfoundController';
import { getPostData } from '../helpers/getPostData';
import { validateUser } from '../helpers/validateUser';

export async function updateUserController(
  res: http.ServerResponse,
  userId: string,
  req: http.IncomingMessage
) {
  const allUsers = myUserServices.getAllUsers();
  const isUser = allUsers.find((user) => user.id === userId);
  const parsedBody = await getPostData(req);

  if (uuidValidate(userId, { version: '4' })) {
    const isUserValidate = validateUser(parsedBody);
    if (!isUserValidate) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Object does not match the User type' }));
    } else if (isUser) {
      const user = myUserServices.updateUserById(parsedBody, isUser.id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      getNotFoundController(res, 'User not found');
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid userId' }));
  }
}
