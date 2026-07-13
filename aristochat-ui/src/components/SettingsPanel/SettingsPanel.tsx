import React from 'react';
import { ChatSettings } from '../../types/chat';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  settings: ChatSettings;
  onChange: (settings: ChatSettings) => void;
}

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <div className={styles.panel}>
      <label className={styles.field}>
        <span>Adapter</span>
        <input
          type="text"
          className={styles.fieldInput}
          value={settings.adapter}
          onChange={(event) => onChange({ ...settings, adapter: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Max tokens</span>
        <input
          type="number"
          className={styles.fieldInput}
          min={1}
          value={settings.maxTokens}
          onChange={(event) => onChange({ ...settings, maxTokens: Number(event.target.value) || 0 })}
        />
      </label>
      <label className={styles.checkboxField}>
        <input
          type="checkbox"
          checked={settings.enableHistory}
          onChange={(event) => onChange({ ...settings, enableHistory: event.target.checked })}
        />
        <span>Enable history</span>
      </label>
    </div>
  );
}
