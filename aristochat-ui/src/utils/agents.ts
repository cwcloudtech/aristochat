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
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error('Unable to parse REACT_APP_AGENTS_ENDPOINTS as JSON.', error);
    return null;
  }

  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (error) {
      console.error('Unable to parse REACT_APP_AGENTS_ENDPOINTS string content as JSON.', error);
      return null;
    }
  }

  if (!Array.isArray(parsed)) {
    console.error('REACT_APP_AGENTS_ENDPOINTS must be a JSON array.');
    return null;
  }

  return parsed.filter(isValidAgent);
}
