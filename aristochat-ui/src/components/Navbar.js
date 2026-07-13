import React from 'react';
import logo from '../assets/logo.png';
import AgentSelector from './AgentSelector';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar({ agents, selectedAgent, onSelectAgent }) {
  return (
    <header className={styles.navbar}>
      <img src={logo} alt="Aristochat" className={styles.logo} />
      <div className={styles.actions}>
        <AgentSelector agents={agents} selectedAgent={selectedAgent} onSelect={onSelectAgent} />
        <ThemeToggle />
      </div>
    </header>
  );
}
