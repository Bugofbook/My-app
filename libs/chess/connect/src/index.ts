import { ChessInfo, Squares} from '@my-app-game/chess/chess/type'
import { getVectorConnectLength, getVectorWillConnectLength } from './basic'
import { getChessByFourVector } from '@my-app-game/chess/chess/squares'

export function getConnectLengthFromSquares<Type extends Record<string, unknown> = Record<string, never>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): Array<number> {
  const ChessesArray = getChessByFourVector(squares, centerChess)
  return ChessesArray.map(chesses => getVectorConnectLength(chesses, centerChess))
}
export function getWillConnectLengthFromSquares<Type extends Record<string, unknown> = Record<string, never>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): Array<[number, number, Array<ChessInfo<Type>>]> {
  const ChessesArray = getChessByFourVector(squares, centerChess)
  return ChessesArray.map(chesses => getVectorWillConnectLength(chesses, centerChess, 1)).reduce((acc, chesses) => [...acc, ...chesses], [])
}
