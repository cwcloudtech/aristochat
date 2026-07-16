# AI instruction 6

## Help

I want an environment variable `REACT_APP_DOCURL` which will contain the following URL:

```
https://www.cwcloud.tech/docs/tutorials/aristochat
```

For now keep it directly in the `.env.react` and `.env.development` files.

In the navbar, add on the right a button/icon which will open the URL in a new tab.

## Display usage

The answer of the agent contains:

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

If `usage` is available (not mandatory), I want you to display the usage in the following format at the end of the answer (italic, small size):

```
Usage: 18 tokens (prompt: 8, completion: 10)
```
