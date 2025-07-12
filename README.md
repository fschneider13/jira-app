# JIRA App

This project contains a simple Node.js application that demonstrates how to
interact with the JIRA REST API while highlighting agile best practices. The
server exposes a few endpoints to fetch agile best practices and interact with
JIRA issues and sprints.

## Requirements

- Node.js 20 or higher
- JIRA Cloud account and API token (for actual API calls)

Because the environment used for development does not allow package
installation from the internet, the application only relies on Node's built-in
modules.

## Setup

Configure the following environment variables to connect to your JIRA instance:

- `JIRA_BASE_URL` – Base URL of your JIRA Cloud instance (e.g. `https://your-domain.atlassian.net`)
- `JIRA_EMAIL` – Email associated with the API token
- `JIRA_API_TOKEN` – API token for authentication
- `PORT` – (Optional) port for the server, default is `3000`

## Running the Server

```bash
npm start
```

This starts a basic HTTP server with these endpoints:

- `GET /agile/best-practices` – Returns an array of agile best practices.
- `GET /issues` – Lists issues from JIRA.
- `POST /issues` – Creates a new JIRA issue from JSON body data.
- `GET /sprints` – Lists boards or sprints.

## Testing

Run the simple unit tests with:

```bash
npm test
```

## Agile Best Practices Included

The application includes a curated list of agile best practices, such as
maintaining a prioritized backlog, limiting work in progress, and holding regular
retrospectives.
