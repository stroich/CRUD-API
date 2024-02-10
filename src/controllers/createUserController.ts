import http from 'http';
import { myUserServices } from '../services/usersServices';
import { getPostData } from '../helpers/getPostData';

export async function createUserController(res: http.ServerResponse, req: http.IncomingMessage) {
  try {
    const parsedBody = await getPostData(req);
    const lengthObjectBody = Object.keys(parsedBody).length;
    const requiredFields = ['username', 'age', 'hobbies'];
    if (lengthObjectBody > 3) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Unnecessary fields present' }));
    } else if (!requiredFields.every((field) => field in parsedBody)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Missing required fields' }));
    } else {
      const newUser = myUserServices.addUser(parsedBody);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid JSON format' }));
  }
}
