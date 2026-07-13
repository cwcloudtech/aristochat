# aristochat

This chat is a web interfacte similar to chatGPT for CWCloud's agents like [`cwc`](https://www.cwcloud.tech/docs/tutorials/cli/public/#create-a-web-agent), [`qwctl`](https://www.cwcloud.tech/docs/tutorials/observability/qwctl/#create-a-web-agent) or [`edtctl`](https://www.cwcloud.tech/docs/tutorials/observability/edtctl/#create-a-web-agent).

## Development

```sh
cd aristochat-ui
npm install
npm start
```

`aristochat-ui/.env.development` contains a sample `REACT_APP_AGENTS_ENDPOINTS` so the app has agents to pick from out of the box; edit it to point at real agent URLs.

## Configuring agents

`REACT_APP_AGENTS_ENDPOINTS` is a JSON array of agents:

```json
[
  { "name": "cwc", "url": "https://cwc.cwcloud.tech", "headers": { "Authorization": "Bearer <token>" } },
  { "name": "qwctl", "url": "https://qwctl.cwcloud.tech", "credentials": { "username": "admin", "password": "admin" } },
  { "name": "edtctl", "url": "https://edtctl.cwcloud.tech" }
]
```

`headers`, `credentials` (turned into HTTP Basic auth), or neither may be provided per agent.

## Build & run with Docker

```sh
cp .env.example .env
# set AGENTS_ENDPOINTS in .env
docker compose up --build
```

At build time, `aristochat-ui/.env.react` bakes the placeholder `REACT_APP_AGENTS_ENDPOINTS="${AGENTS_ENDPOINTS}"` into the JS bundle. At container startup, `.docker/nginx/docker-entrypoint.sh` runs `envsubst` over the built files to replace `${AGENTS_ENDPOINTS}` with the real `AGENTS_ENDPOINTS` environment variable.

Because that replacement happens inside an already-quoted JS string, **any double quote in the `AGENTS_ENDPOINTS` JSON must be backslash-escaped** (`\"`) or the substitution will produce invalid JavaScript. See the example in [.env.example](./.env.example).

