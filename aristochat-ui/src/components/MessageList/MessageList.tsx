import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../types/chat';
import Message from '../Message/Message';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.list} ref={listRef}>
      {messages.map((message) => (
        <Message key={message.id} role={message.role} content={message.content} usage={message.usage} />
      ))}
      {isLoading && (
        <div className={styles.typing}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
