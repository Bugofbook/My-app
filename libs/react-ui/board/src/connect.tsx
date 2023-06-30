import { Layer } from 'react-konva';
import type { ChessSet } from '@my-app-game/chess/chess'
import { Standard33Board, Standard1717Board, Standard1919Board } from './standard'
import { StandardChesses } from './chess'
type TableProps = {
  tableX: number,
  tableY: number,
  gameState: string,
  chessesList: Map<string, ChessSet | null>,
  onClickSquare: (locationString: string) => void
}

export function TictactoeBoard({ tableX, tableY, gameState, chessesList, onClickSquare}: TableProps) {
  return (
    <Layer x={tableX | 0} y={tableY | 0}>
      <Standard33Board
        squareWeight={30}
        boardState={new Map()}
        onClickBoard={onClickSquare}
        gameState={gameState}
      />
      {
        [...chessesList.values()].map((chess) => {
          return chess === null ? null : <StandardChesses key={chess.id} {...chess} />
        })
      }
    </Layer>
  )
}

export function GomokuBoard({ tableX, tableY, gameState, chessesList, onClickSquare}: TableProps) {
  return (
    <Layer x={tableX | 30} y={tableY | 30}>
      <Standard1717Board
        squareWeight={30}
        boardState={new Map()}
        onClickBoard={onClickSquare}
        gameState={gameState}
      />
      {
        [...chessesList.values()].map((chess) => {
          return chess === null ? null : <StandardChesses key={chess.id} {...chess} />
        })
      }
    </Layer>
  )
}

export function Connect6Board({ tableX, tableY, gameState, chessesList, onClickSquare}: TableProps) {
  return (
    <Layer x={tableX | 30} y={tableY | 30}>
      <Standard1919Board
        squareWeight={30}
        boardState={new Map()}
        onClickBoard={onClickSquare}
        gameState={gameState}
      />
      {
        [...chessesList.values()].map((chess) => {
          return chess === null ? null : <StandardChesses key={chess.id} {...chess} />
        })
      }
    </Layer>
  )
}
