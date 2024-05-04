import { useState, useMemo } from 'react';

export function useGameHistory<T>(startData: T) {
  const [history, setHistory] = useState<Array<T>>([startData]);
  const dispatch = useMemo(() => ({
    saveHistory: (data: T) => setHistory((history) => [...history, data]),
    jumpHistory: (step: number) => setHistory(history => history.slice(0, step + 1)),
    jumpStart: () => setHistory([])
  }),[])
  return [
    history,
    dispatch
  ] as const
}
