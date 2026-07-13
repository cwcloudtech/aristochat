import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { sendMessage } from '../../services/chatApi';
import { Agent } from '../../types/agent';
import { ChatMessage } from '../../types/chat';
import ChatInput from '../ChatInput/ChatInput';
import EmptyState from '../EmptyState/EmptyState';
import MessageList from '../MessageList/MessageList';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  agent: Agent | null;
  hasAgents: boolean;
}

let messageId = 0;
const nextId = () => `msg-${Date.now()}-${messageId++}`;

const MAX_TOKENS = 500;
const ENABLE_HISTORY = true;

export default function ChatWindow({ agent, hasAgents }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function callAgent(text: string, { regenerate = false } = {}) {
    if (!agent) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await sendMessage(agent, {
        message: text,
        adapter: agent.name,
        maxTokens: MAX_TOKENS,
        regenerate,
        enableHistory: ENABLE_HISTORY,
      });
      setMessages((current) => [
        ...current,
        { id: nextId(), role: 'assistant', content: data.message, usage: data.usage },
      ]);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSend(text: string) {
    setMessages((current) => [...current, { id: nextId(), role: 'user', content: text }]);
    callAgent(text);
  }

  function handleRegenerate() {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');
    if (!lastUserMessage || isLoading) {
      return;
    }
    setMessages((current) => {
      const lastIndex = current.length - 1;
      if (current[lastIndex]?.role === 'assistant') {
        return current.slice(0, lastIndex);
      }
      return current;
    });
    callAgent(lastUserMessage.content, { regenerate: true });
  }

  function handleNewChat() {
    setMessages([]);
  }

  const canRegenerate = !isLoading && messages.some((message) => message.role === 'assistant');

  if (!agent) {
    return (
      <div className={styles.window}>
        <EmptyState hasAgents={hasAgents} />
      </div>
    );
  }

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <span className={styles.agentName}>{agent.name}</span>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.headerIconButton}
            onClick={handleRegenerate}
            disabled={!canRegenerate}
            aria-label="Regenerate response"
            title="Regenerate response"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16m0 5v-5h5"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.headerIconButton}
            onClick={handleNewChat}
            disabled={messages.length === 0}
            aria-label="New chat"
            title="New chat"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
      {messages.length === 0 ? (
        <EmptyState hasAgents={hasAgents} />
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}
      <ChatInput disabled={isLoading} onSend={handleSend} />
    </div>
  );
}
