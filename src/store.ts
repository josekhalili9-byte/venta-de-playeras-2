import { useState, useEffect } from 'react';
import { Jersey, INITIAL_JERSEYS } from './types';

export function useJerseys() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('jersey_legends_catalog');
    if (stored) {
      try {
        setJerseys(JSON.parse(stored));
      } catch (e) {
        setJerseys(INITIAL_JERSEYS);
      }
    } else {
      setJerseys(INITIAL_JERSEYS);
      localStorage.setItem('jersey_legends_catalog', JSON.stringify(INITIAL_JERSEYS));
    }
    setIsLoaded(true);
  }, []);

  const saveJerseys = (newJerseys: Jersey[]) => {
    setJerseys(newJerseys);
    localStorage.setItem('jersey_legends_catalog', JSON.stringify(newJerseys));
  };

  const addJersey = (jersey: Omit<Jersey, 'id'>) => {
    const newJersey = { ...jersey, id: Date.now().toString() };
    saveJerseys([...jerseys, newJersey]);
  };

  const updateJersey = (id: string, updatedData: Partial<Jersey>) => {
    saveJerseys(jerseys.map(j => j.id === id ? { ...j, ...updatedData } : j));
  };

  const deleteJersey = (id: string) => {
    saveJerseys(jerseys.filter(j => j.id !== id));
  };

  return { jerseys, isLoaded, addJersey, updateJersey, deleteJersey };
}
