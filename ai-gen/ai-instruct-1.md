# AI instruction 1

## Chat

Write a react chat which is a static web interface in React, similar to chatGPT for CWCloud's agents like [`cwc`](https://www.cwcloud.tech/docs/tutorials/cli/public/#create-a-web-agent), [`qwctl`](https://www.cwcloud.tech/docs/tutorials/observability/qwctl/#create-a-web-agent) or [`edtctl`](https://www.cwcloud.tech/docs/tutorials/observability/edtctl/#create-a-web-agent).

I want an environment variable `AGENTS_ENDPOINTS` which is a json of agents like this:

```json
[
    {
        "name": "cwc",
        "url": "https://cwc.cwcloud.tech",
        "headers": {
            "Authorization": "Bearer <token>"
        }
    },
    {
        "name": "qwctl",
        "url": "https://qwctl.cwcloud.tech",
        "credentials": {
            "username": "admin",
            "password": "admin"
        }
    },
    {
        "name": "edtctl",
        "url": "https://edtctl.cwcloud.tech"
    }
]
```

As you can see you can authenticate with either `headers` or `credentials` or nothing.

In the chat I want a select autocomplete dropdown with all the agents.

Here's the interface contract `POST /` (with `Content-Type: application/json`):

```json
{
  "adapter": "test",
  "settings": {
    "max_tokens": 500
  },
  "message": "A prompt",
  "regenerate": false,
  "enable_history": true
}
```

And the response will be like:

```json
{
  "status": "ok",
  "message": "Hello! How can I assist you today with cloud automation or deployment using CWCloud?",
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 10,
    "total_tokens": 18
  }
}
```

## UX/UI

I want light mode and dark mode with icon in the navbar to switch between them.

The `message` will answere markdown, so I want to render it properly.

## Error handling

I want toasts for the errors.
