import http from 'http';
import { InvalidJSONError } from '../error/customErrors';

export async function sendErrorResponse(res: http.ServerResponse, error: Error) {
  if (error instanceof InvalidJSONError) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid object format' }));
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}
