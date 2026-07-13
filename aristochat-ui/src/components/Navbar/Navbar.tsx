import React from 'react';
import logo from '../../assets/logo.png';
import { Agent } from '../../types/agent';
import AgentSelector from '../AgentSelector/AgentSelector';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

interface NavbarProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
}

export default function Navbar({ agents, selectedAgent, onSelectAgent }: NavbarProps) {
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
