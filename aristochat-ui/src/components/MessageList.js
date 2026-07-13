import React, { useEffect, useRef } from 'react';
import Message from './Message';
import styles from './MessageList.module.css';

export default function MessageList({ messages, isLoading }) {
  const bottomRef = useRef(null);

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
