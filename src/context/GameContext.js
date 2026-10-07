import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = 'https://countriesnow.space/api/v0.1/countries/flag/images';

const GameContext = createContext(null);

// Saca tildes y mayúsculas para comparar sin problemas
const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

export function GameProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Al montar la app: traer países y elegir uno al azar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        const list = json.data.filter((c) => c.name && c.iso2);
        setCountries(list);
        setCurrentCountry(pickRandom(list));
      })
      .catch(() => setError('No se pudieron cargar los países'))
      .finally(() => setLoading(false));
  }, []);

  const nextCountry = () => {
    setCurrentCountry(pickRandom(countries));
    console.log('Next country:', currentCountry?.name);
  };

  const guess = (text) => {
    if (!currentCountry || !text.trim()) return;

    if (normalize(text) === normalize(currentCountry.name)) {
      setScore((prev) => prev + 10);
      setFeedback('correct');
      nextCountry();
    } else {
      setScore((prev) => prev - 1);
      setFeedback('wrong');
    }
  };

  const resetScore = () => {
    setScore(0);
    setFeedback(null);
    nextCountry();
  };

  const value = {
    countries,
    currentCountry,
    score,
    loading,
    error,
    feedback,
    guess,
    nextCountry,
    resetScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Hook para consumir el contexto desde cualquier componente
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de un <GameProvider>');
  }
  return context;
}
