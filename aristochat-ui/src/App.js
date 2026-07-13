import React, { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { loadAgents } from './utils/agents';
import styles from './App.module.css';

function AppContent() {
  const { theme } = useTheme();
  const agents = useMemo(() => loadAgents(), []);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    if (agents === null) {
      toast.error('Invalid agents configuration: REACT_APP_AGENTS_ENDPOINTS is not valid JSON.');
    }
  }, [agents]);

  const agentList = agents ?? [];

  return (
    <div className={styles.app}>
      <Navbar agents={agentList} selectedAgent={selectedAgent} onSelectAgent={setSelectedAgent} />
      <ChatWindow agent={selectedAgent} hasAgents={agentList.length > 0} />
      <ToastContainer position="top-right" theme={theme} autoClose={5000} newestOnTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
