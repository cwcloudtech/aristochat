import { useEffect, useRef, useState } from 'react';

const TICK_MS = 16;
const TARGET_TICKS = 90;

interface TypewriterResult {
  displayedText: string;
  isTyping: boolean;
}

export function useTypewriter(text: string, enabled: boolean): TypewriterResult {
  const [displayedLength, setDisplayedLength] = useState(enabled ? 0 : text.length);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current) {
      return undefined;
    }
    startedRef.current = true;

    const chunkSize = Math.max(1, Math.ceil(text.length / TARGET_TICKS));
    const intervalId = setInterval(() => {
      setDisplayedLength((current) => {
        const next = current + chunkSize;
        if (next >= text.length) {
          clearInterval(intervalId);
          return text.length;
        }
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(intervalId);
  }, [enabled, text]);

  return {
    displayedText: enabled ? text.slice(0, displayedLength) : text,
    isTyping: enabled && displayedLength < text.length,
  };
}
