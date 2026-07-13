import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../types/chat';
import Message from '../Message/Message';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  return (
    <div className={styles.list}>
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
