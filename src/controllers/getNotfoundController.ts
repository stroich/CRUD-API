import http from 'http';

export function getNotFoundController(res: http.ServerResponse, message: string) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ message: message }));
  res.end();
}
