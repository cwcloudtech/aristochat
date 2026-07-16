import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import catIcon from '../../assets/cat.png';
import { useTypewriter } from '../../hooks/useTypewriter';
import { ChatUsage, MessageRole } from '../../types/chat';
import { highlightCode } from '../../utils/highlightCode';
import styles from './Message.module.css';

interface MessageProps {
  role: MessageRole;
  content: string;
  usage?: ChatUsage;
}

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

function CodeBlock({ className, children }: CodeProps) {
  const text = String(children).replace(/\n$/, '');
  const isBlock = /language-/.test(className || '') || text.includes('\n');

  if (!isBlock) {
    return <code className={className}>{children}</code>;
  }

  return <code className={className}>{highlightCode(text)}</code>;
}

export default function Message({ role, content, usage }: MessageProps) {
  const isUser = role === 'user';
  const { displayedText, isTyping } = useTypewriter(content, !isUser);

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ''}`}>
      {!isUser && <img src={catIcon} alt="" className={styles.avatar} />}
      <div className={styles.column}>
        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
          {isUser ? (
            <p className={styles.plainText}>{content}</p>
          ) : (
            <div className={`${styles.markdown} ${isTyping ? styles.typingCursor : ''}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={{ code: CodeBlock }}>
                {displayedText}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {usage && !isTyping && (
          <span className={styles.usage}>
            Usage: {usage.total_tokens} tokens (prompt: {usage.prompt_tokens}, completion: {usage.completion_tokens})
          </span>
        )}
      </div>
    </div>
  );
}
