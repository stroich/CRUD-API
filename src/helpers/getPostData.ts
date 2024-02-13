import { InvalidJSONError } from '../error/customErrors';
import http from 'http';

export function getPostData(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, request) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          request(new InvalidJSONError('Неверный формат JSON'));
        }
      });
    } catch (error) {
      request(error);
    }
  });
}
