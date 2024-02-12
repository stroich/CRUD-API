import cluster from 'cluster';
import http from 'http';
import { createMyServer } from './createMyServer';
import { availableParallelism } from 'node:os';

export function createHorizontalScaling(PORT: string) {
  const NUM_CPUS = availableParallelism();
  const workers = [];

  if (cluster.isPrimary) {
    for (let i = 0; i < 3; i++) {
      const workersPort = +PORT + i + 1;
      const currentPath = `http://localhost:${workersPort}`;
      const childWorker = cluster.fork({ PORT: workersPort });
      workers.push(currentPath);
      childWorker.on('message', (data) => {
        workers.forEach((worker) => worker.send(data));
      });
    }

    let currentIndex = 0;

    http
      .createServer((req, res) => {
        const worker = workers[currentIndex];
        currentIndex = (currentIndex + 1) % workers.length;

        const requestOptions = {
          method: req.method,
          headers: req.headers,
          path: req.url,
        };

        const proxyRequest = http.request(worker + requestOptions.path, requestOptions);

        proxyRequest.on('response', (proxyResponse) => {
          res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
          proxyResponse.pipe(res);
        });

        proxyRequest.on('error', (err) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err.message);
        });

        req.pipe(proxyRequest);
      })
      .listen(PORT, () => {
        console.log(`Load balancer listening on port ${PORT}`);
      });

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    const port = process.env.PORT;
    createMyServer(port, true, cluster.worker.id);
  }
}
