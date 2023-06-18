import { ChessInfo, Squares} from '@my-app-game/chess/chess/type'
import { getCatchedChesses, hasCatchedChesses } from './basic';
import { getChessesByEightVector } from '@my-app-game/chess/chess/squares'
export function getChageChessFromSquares<Type extends Record<string, unknown> = Record<string, never>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): Array<ChessInfo<Type>> {
  const ChessesArray = getChessesByEightVector(squares, centerChess)
  return ChessesArray.reduce((acc, chessArray) => [...acc, ...getCatchedChesses(chessArray, centerChess)], [])
}
export function hasChageChessFromSquares<Type extends Record<string, unknown> = Record<string, never>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): boolean {
  const ChessesArray = getChessesByEightVector(squares, centerChess)
  return ChessesArray.some((chessArray) => hasCatchedChesses(chessArray, centerChess))
}
