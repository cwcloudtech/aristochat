import { useEffect, useState } from 'react';
import { Manifest } from '../types/manifest';

export function useManifest(): Manifest | null {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/manifest.json')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Manifest | null) => {
        if (!cancelled) {
          setManifest(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setManifest(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return manifest;
}
