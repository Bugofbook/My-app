import type { ChessSet, Squares, ChessLocation} from '@my-app-game/chess/chess'
import { getCatchedChesses, hasCatchedChesses } from './basic';
import { getChessesByEightVector } from '@my-app-game/chess/chess'

export function getChageChessFromSquares<Type>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): Array<ChessSet<Type>>
export function getChageChessFromSquares(squares: Squares, centerChess: ChessSet & {to: ChessLocation}): Array<ChessSet>
export function getChageChessFromSquares<Type>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): Array<ChessSet<Type>> {
  const ChessesArray = getChessesByEightVector(squares, centerChess)
  return ChessesArray.reduce((acc, chessArray) => [...acc, ...getCatchedChesses(chessArray, centerChess)], [])
}
export function hasChageChessFromSquares<Type>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): boolean
export function hasChageChessFromSquares(squares: Squares, centerChess: ChessSet & {to: ChessLocation}): boolean
export function hasChageChessFromSquares<Type>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): boolean {
  const ChessesArray = getChessesByEightVector(squares, centerChess)
  return ChessesArray.some((chessArray) => hasCatchedChesses(chessArray, centerChess))
}
