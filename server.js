const http = require('http');
const url = require('url');
const { getBestPractices } = require('./agileBestPractices');
const { getIssues, createIssue, getSprints } = require('./jiraClient');

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && parsedUrl.pathname === '/agile/best-practices') {
    res.writeHead(200);
    res.end(JSON.stringify({ bestPractices: getBestPractices() }));
  } else if (req.method === 'GET' && parsedUrl.pathname === '/issues') {
    try {
      const issues = await getIssues();
      res.writeHead(200);
      res.end(JSON.stringify({ issues }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (req.method === 'POST' && parsedUrl.pathname === '/issues') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const data = JSON.parse(body || '{}');
      try {
        const issue = await createIssue(data);
        res.writeHead(201);
        res.end(JSON.stringify({ issue }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (req.method === 'GET' && parsedUrl.pathname === '/sprints') {
    try {
      const sprints = await getSprints();
      res.writeHead(200);
      res.end(JSON.stringify({ sprints }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
