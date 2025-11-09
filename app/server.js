const express = require('express');
const client = require('prom-client');
const app = express();
const port = 8080;

// Default metrics
client.collectDefaultMetrics();

// Custom counter metric
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests'
});

app.get('/', (req, res) => {
  httpRequests.inc();
  res.send('Hello from monitored app!');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running at http://localhost:${port}`);
});
