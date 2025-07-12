const https = require('https');
const { URL } = require('url');

const BASE_URL = process.env.JIRA_BASE_URL;
const EMAIL = process.env.JIRA_EMAIL;
const API_TOKEN = process.env.JIRA_API_TOKEN;

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    if (!BASE_URL || !EMAIL || !API_TOKEN) {
      reject(new Error('Missing JIRA credentials'));
      return;
    }

    const url = new URL(path, BASE_URL);
    const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');

    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (_) {
            resolve({});
          }
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', err => reject(err));

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

function getIssues() {
  return request('GET', '/rest/api/3/search');
}

function createIssue(issueData) {
  return request('POST', '/rest/api/3/issue', issueData);
}

function getSprints() {
  return request('GET', '/rest/agile/1.0/board');
}

module.exports = { getIssues, createIssue, getSprints };
