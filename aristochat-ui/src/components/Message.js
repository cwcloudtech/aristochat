import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import catIcon from '../assets/cat.png';
import styles from './Message.module.css';

export default function Message({ role, content, usage }) {
  const isUser = role === 'user';

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ''}`}>
      {!isUser && <img src={catIcon} alt="" className={styles.avatar} />}
      <div className={styles.column}>
        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
          {isUser ? (
            <p className={styles.plainText}>{content}</p>
          ) : (
            <div className={styles.markdown}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {usage && (
          <span className={styles.usage}>
            {usage.total_tokens} tokens ({usage.prompt_tokens} prompt / {usage.completion_tokens} completion)
          </span>
        )}
      </div>
    </div>
  );
}
