import { useState, useCallback } from 'react';

export function useGameHistory<T>() {
  const [history, setHistory] = useState<Array<T>>([]);
  const saveHistory = useCallback((data: T) => {
    setHistory((history) => {
      return [...history, data]
    })
  },[]);
  const jumpHistory = useCallback((step: number) => {
    setHistory(history => history.slice(0, step + 1))
  },[]);
  const jumpStart = useCallback(() => {
    setHistory([])
  },[]);
  return {
    history,
    saveHistory,
    jumpHistory,
    jumpStart
  }
}
