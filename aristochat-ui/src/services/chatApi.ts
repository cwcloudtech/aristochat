import { Agent } from '../types/agent';
import { ChatResponsePayload } from '../types/chat';

function buildHeaders(agent: Agent): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (agent.headers) {
    Object.assign(headers, agent.headers);
  } else if (agent.credentials?.username) {
    const { username, password = '' } = agent.credentials;
    headers.Authorization = `Basic ${window.btoa(`${username}:${password}`)}`;
  }

  return headers;
}

interface SendMessageOptions {
  message: string;
  adapter: string;
  maxTokens: number;
  regenerate: boolean;
  enableHistory: boolean;
}

export async function sendMessage(
  agent: Agent,
  { message, adapter, maxTokens, regenerate, enableHistory }: SendMessageOptions
): Promise<ChatResponsePayload> {
  const endpoint = new URL('/', agent.url).toString();

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: buildHeaders(agent),
      body: JSON.stringify({
        adapter,
        settings: { max_tokens: maxTokens },
        message,
        regenerate,
        enable_history: enableHistory,
      }),
    });
  } catch (error) {
    throw new Error(`Unable to reach "${agent.name}": ${(error as Error).message}`);
  }

  let data: ChatResponsePayload | null = null;
  try {
    data = await response.json();
  } catch {
    // Body may be empty on error responses; fall through to status handling below.
  }

  if (!response.ok || data?.status !== 'ok') {
    throw new Error(data?.message || `"${agent.name}" returned an error (${response.status}).`);
  }

  return data;
}
