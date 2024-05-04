import type { ChessSet, Squares, ChessLocation} from '@my-app-game/chess/chess'
import { getVectorConnectLength, getVectorWillConnectLength } from './basic'
import { getChessByFourVector } from '@my-app-game/chess/chess'

export function getConnectLengthFromSquares<Type = undefined>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): Array<number> {
  const ChessesArray = getChessByFourVector(squares, centerChess)
  return ChessesArray.map(chesses => getVectorConnectLength(chesses, centerChess))
}
export function getWillConnectLengthFromSquares<Type = undefined>(squares: Squares<Type>, centerChess: ChessSet<Type> & {to: ChessLocation}): Array<[number, number, Array<ChessSet>]> {
  const ChessesArray = getChessByFourVector(squares, centerChess)
  return ChessesArray.map(chesses => getVectorWillConnectLength(chesses, centerChess, 1)).reduce((acc, chesses) => [...acc, ...chesses], [])
}
