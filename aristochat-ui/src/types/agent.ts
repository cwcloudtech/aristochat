export interface AgentCredentials {
  username: string;
  password?: string;
}

export interface Agent {
  name: string;
  url: string;
  headers?: Record<string, string>;
  credentials?: AgentCredentials;
}
