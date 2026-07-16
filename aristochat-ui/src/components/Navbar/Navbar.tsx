import React from 'react';
import logo from '../../assets/logo.png';
import { useManifest } from '../../hooks/useManifest';
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
  const docUrl = process.env.REACT_APP_DOCURL;
  const manifest = useManifest();

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <img src={logo} alt="Aristochat" className={styles.logo} />
        {manifest && (
          <span className={styles.version} title={`${manifest.sha} — ${manifest.details}`}>
            v{manifest.version}
          </span>
        )}
      </div>
      <div className={styles.actions}>
        <AgentSelector agents={agents} selectedAgent={selectedAgent} onSelect={onSelectAgent} />
        <ThemeToggle />
        {docUrl && (
          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docLink}
            aria-label="Open documentation"
            title="Documentation"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a1.5 1.5 0 0 1-1.06-.44A9.87 9.87 0 0 0 4 17.5a1.5 1.5 0 0 1-1.5-1.5V5.5A1.5 1.5 0 0 1 4 4a9.87 9.87 0 0 1 8 4 9.87 9.87 0 0 1 8-4 1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5 9.87 9.87 0 0 0-6.94 3.06A1.5 1.5 0 0 1 12 21Z"
              />
              <path strokeLinecap="round" d="M12 8v13" />
            </svg>
          </a>
        )}
      </div>
    </header>
  );
}
