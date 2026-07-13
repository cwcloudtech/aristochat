import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Agent } from '../../types/agent';
import styles from './AgentSelector.module.css';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelect: (agent: Agent) => void;
}

export default function AgentSelector({ agents, selectedAgent, onSelect }: AgentSelectorProps) {
  const [query, setQuery] = useState(selectedAgent?.name ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selectedAgent?.name ?? '');
  }, [selectedAgent]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery(selectedAgent?.name ?? '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedAgent]);

  const filteredAgents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized || normalized === selectedAgent?.name?.toLowerCase()) {
      return agents;
    }
    return agents.filter((agent) => agent.name.toLowerCase().includes(normalized));
  }, [agents, query, selectedAgent]);

  function selectAgent(agent: Agent) {
    onSelect(agent);
    setQuery(agent.name);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      setIsOpen(true);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((index) => Math.min(index + 1, filteredAgents.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const agent = filteredAgents[highlightedIndex];
      if (agent) {
        selectAgent(agent);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setQuery(selectedAgent?.name ?? '');
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="agent-listbox"
        className={styles.input}
        placeholder="Select an agent…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setHighlightedIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      <svg className={styles.chevron} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
      {isOpen && (
        <ul id="agent-listbox" role="listbox" className={styles.list}>
          {filteredAgents.length === 0 && <li className={styles.empty}>No agents found</li>}
          {filteredAgents.map((agent, index) => (
            <li
              key={agent.name}
              role="option"
              aria-selected={agent.name === selectedAgent?.name}
              className={`${styles.option} ${index === highlightedIndex ? styles.highlighted : ''}`}
              onMouseDown={(event) => {
                event.preventDefault();
                selectAgent(agent);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {agent.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
