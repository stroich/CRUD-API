import http from 'http';

export function getNotFoundController(res: http.ServerResponse, message: string) {
  try {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: message }));
    res.end();
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}
