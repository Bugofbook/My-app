import { Layer } from 'react-konva';
import type { ChessSet } from '@my-app-game/chess/chess'
import { Standard88Board } from './standard'
import { StandardChesses } from './chess'
type TableProps = {
  tableX: number,
  tableY: number,
  gameState: string,
  chessesList: Map<string, ChessSet | null>,
  onClickSquare: (locationString: string) => void
}
export function OthelloBoard({ tableX, tableY, gameState, chessesList, onClickSquare}: TableProps) {
  return (
    <Layer x={tableX | 0} y={tableY | 0}>
      <Standard88Board
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
