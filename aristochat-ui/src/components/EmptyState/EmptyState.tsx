import React from 'react';
import catIcon from '../../assets/cat.png';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  hasAgents: boolean;
}

export default function EmptyState({ hasAgents }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <img src={catIcon} alt="" className={styles.icon} />
      <h2 className={styles.title}>{hasAgents ? 'Pick an agent to start chatting' : 'No agents configured'}</h2>
      <p className={styles.subtitle}>
        {hasAgents
          ? 'Choose one of your CWCloud agents from the dropdown above.'
          : 'Set REACT_APP_AGENTS_ENDPOINTS to list the agents available to this chat.'}
      </p>
    </div>
  );
}
