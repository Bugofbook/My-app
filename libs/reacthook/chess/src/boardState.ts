import { useState, useCallback } from 'react';
import type { ChessSet } from '@my-app-game/chess/chess'
export function useBoardState<ChessOtherType = undefined, BoardType = Record<string, unknown>>(startBoardState: Map<string, BoardType>, startChessesState: Map<string, ChessSet<ChessOtherType> | null>) {
  const [boardMap, setboardMap] = useState<Map<string, BoardType>>(startBoardState)
  const [chessesMap, setchessesMap] = useState<Map<string, ChessSet<ChessOtherType> | null>>(startChessesState)
  const updateBoardState = useCallback((changeState: Map<string, BoardType>) => {
    setboardMap((prev) => {
      return new Map([...prev, ...changeState])
    })
  }, [])
  const updateChessState = useCallback((changeState: Map<string, ChessSet<ChessOtherType>>) => {
    setchessesMap((prev) => {
      return new Map([...prev, ...changeState])
    })
  }, [])
  const initialBoardState = useCallback(() => {
    setboardMap(startBoardState)
  }, [startBoardState])
  const initialChessState = useCallback(() => {
    setchessesMap(startChessesState)
  }, [startChessesState])
  const setBoardState = useCallback((boardMap: Map<string, BoardType>) => {
    setboardMap(boardMap)
  }, [])
  const setChessState = useCallback((chessesMap: Map<string, ChessSet<ChessOtherType>>) => {
    setchessesMap(chessesMap)
  }, [])
  return {
    boardMap,
    chessesMap,
    updateBoardState,
    updateChessState,
    initialBoardState,
    initialChessState,
    setBoardState,
    setChessState,
  }
}
