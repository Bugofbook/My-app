import { ChessSet, ChessLocation, Squares, getChessByTwoVector, RowVector, ColumnVector, SlashVector, BackSlashVector } from '@my-app-game/chess/chess/gameBasic'

type APIChessAction = Array<Array<ChessSet>>
type OneAction = {
  action: string,
  owner: string,
}
