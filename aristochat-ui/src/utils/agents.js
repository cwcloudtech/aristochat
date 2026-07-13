function isValidAgent(agent) {
  return Boolean(agent) && typeof agent.name === 'string' && typeof agent.url === 'string';
}

// Returns the parsed agent list, an empty array when none are configured,
// or null when REACT_APP_AGENTS_ENDPOINTS holds unparsable/invalid content.
export function loadAgents() {
  const raw = process.env.REACT_APP_AGENTS_ENDPOINTS;

  if (!raw) {
    return [];
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error('Unable to parse REACT_APP_AGENTS_ENDPOINTS as JSON.', error);
    return null;
  }

  if (!Array.isArray(parsed)) {
    console.error('REACT_APP_AGENTS_ENDPOINTS must be a JSON array.');
    return null;
  }

  return parsed.filter(isValidAgent);
}
