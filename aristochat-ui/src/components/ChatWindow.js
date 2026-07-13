import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { sendMessage } from '../services/chatApi';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import MessageList from './MessageList';
import SettingsPanel from './SettingsPanel';
import styles from './ChatWindow.module.css';

let messageId = 0;
const nextId = () => `msg-${Date.now()}-${messageId++}`;

const DEFAULT_SETTINGS = { adapter: 'default', maxTokens: 500, enableHistory: true };

export default function ChatWindow({ agent, hasAgents }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  async function callAgent(text, { regenerate = false } = {}) {
    setIsLoading(true);
    try {
      const data = await sendMessage(agent, {
        message: text,
        adapter: settings.adapter,
        maxTokens: settings.maxTokens,
        regenerate,
        enableHistory: settings.enableHistory,
      });
      setMessages((current) => [
        ...current,
        { id: nextId(), role: 'assistant', content: data.message, usage: data.usage },
      ]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSend(text) {
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
          <button type="button" className={styles.headerButton} onClick={handleRegenerate} disabled={!canRegenerate}>
            Regenerate
          </button>
          <button type="button" className={styles.headerButton} onClick={handleNewChat} disabled={messages.length === 0}>
            New chat
          </button>
          <button
            type="button"
            className={styles.headerButton}
            onClick={() => setShowSettings((value) => !value)}
            aria-expanded={showSettings}
          >
            Settings
          </button>
        </div>
      </div>
      {showSettings && <SettingsPanel settings={settings} onChange={setSettings} />}
      {messages.length === 0 ? (
        <EmptyState hasAgents={hasAgents} />
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}
      <ChatInput disabled={isLoading} onSend={handleSend} />
    </div>
  );
}
