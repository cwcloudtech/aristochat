export type MessageRole = 'user' | 'assistant';

export interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
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

export interface ChatSettings {
  adapter: string;
  maxTokens: number;
  enableHistory: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  usage?: ChatUsage;
}
