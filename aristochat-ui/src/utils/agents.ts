import { Agent } from '../types/agent';

function isValidAgent(agent: unknown): agent is Agent {
  return (
    Boolean(agent) &&
    typeof (agent as Agent).name === 'string' &&
    typeof (agent as Agent).url === 'string'
  );
}

// Returns the parsed agent list, an empty array when none are configured,
// or null when REACT_APP_AGENTS_ENDPOINTS holds unparsable/invalid content.
//
// REACT_APP_AGENTS_ENDPOINTS may hold the agents JSON directly (e.g. from
// .env.development), or it may hold a JSON-quoted string wrapping that JSON
// (e.g. injected via envsubst at container startup). Parsing once unquotes
// the latter case, so a second parse is needed to reach the actual array.
export function loadAgents(): Agent[] | null {
  const raw = process.env.REACT_APP_AGENTS_ENDPOINTS;
  if (!raw) {
    return [];
  }

  let parsed: unknown;
  // First attempt: parse as JSON. This covers the normal case where the
  // environment variable contains a JSON array like
  // '[{"name":"x","url":"..."}]'.
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    // Fallback: sometimes the value is wrapped in single quotes (shell-style)
    // or otherwise quoted. Try stripping surrounding single/double quotes
    // and parse again.
    const stripped = raw.replace(/^['"]|['"]$/g, '');
    try {
      parsed = JSON.parse(stripped);
    } catch (err2) {
      console.error('Unable to parse AGENTS_ENDPOINTS as JSON.', error, err2);
      return [];
    }
  }

  // If parsing produced a string, it's likely the JSON was double-encoded
  // (e.g. '"[... ]"'), so parse that string once more.
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (err) {
      console.error('AGENTS_ENDPOINTS contains an encoded JSON string.', err);
      return [];
    }
  }

  if (!Array.isArray(parsed)) {
    console.error('AGENTS_ENDPOINTS must be a JSON array.');
    return [];
  }

  return (parsed as unknown[]).filter(isValidAgent);
}
