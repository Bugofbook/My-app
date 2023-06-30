import { useState, useCallback, useReducer } from 'react';

export function useGameHistory<T>(startData: T): [Array<T>, {
  saveHistory: (data: T)=> void,
  jumpHistory: (step: number) => void,
  jumpStart: () => void
}] {
  const [history, setHistory] = useState<Array<T>>([startData]);
  const saveHistory = useCallback((data: T) => {
    setHistory((history) => [...history, data])
  },[]);
  const jumpHistory = useCallback((step: number) => {
    setHistory(history => history.slice(0, step + 1))
  },[]);
  const jumpStart = useCallback(() => {
    console.log('jumpStart')
    setHistory([])
  },[]);
  return [
    history,
    {
      saveHistory,
      jumpHistory,
      jumpStart
    }
  ]
  // const [state, dispatch] = useReducer()
}
