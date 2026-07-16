export type MessageRole = 'user' | 'assistant';

export interface ChatUsage {
  prompt: number;
  completion: number;
  total: number;
}

export interface ChatRequestPayload {
  adapter: string;
  settings: {
    max_tokens: number;
  };
  message: string;
  regenerate: boolean;
  enable_history: boolean;
}

export interface ChatResponsePayload {
  status: string;
  message: string;
  usage?: ChatUsage;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  usage?: ChatUsage;
}
