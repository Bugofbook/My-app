import { useState, useCallback } from 'react';



export function useBoardState<Location extends string,BoardState, ChessState>(board: Array<Array<Location>>, startBoardState: Record<Location, BoardState>, startChessesState: Record<Location, ChessState>) {
  const [boardState, setboardState] = useState<Record<Location, BoardState>>(startBoardState)
  const [chessState, setchessState] = useState<Record<Location, ChessState>>(startChessesState)
  const updateBoardState = useCallback((changeState: Record<Location, BoardState>) => {
    setboardState((prev) => {
      return { ...prev, ...changeState }
    })
  }, [])
  const updateChessState = useCallback((changeState: Record<Location, ChessState>) => {
    setchessState((prev) => {
      return { ...prev, ...changeState }
    })
  }, [])
  const initialBoardState = useCallback(() => {
    setboardState(startBoardState)
  }, [startBoardState])
  const initialChessState = useCallback(() => {
    setchessState(startChessesState)
  }, [startChessesState])
  return {
    boardState,
    chessState,
    updateBoardState,
    updateChessState,
    initialBoardState,
    initialChessState
  }
}
