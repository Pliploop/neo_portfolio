import { useState, useEffect } from 'react';

export const useMeshGradient = () => {
  const [MeshGradientRenderer, setMeshGradientRenderer] = useState(null);
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const mod = await import('@johnn-e/react-mesh-gradient');
        if (!cancelled) {
          setMeshGradientRenderer(() => mod.MeshGradientRenderer);
          setTimeout(() => setShowGradient(true), 100);
        }
      } catch {
        // gradient unavailable — page still works without it
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { MeshGradientRenderer, showGradient };
};
