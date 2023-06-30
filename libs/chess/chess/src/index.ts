export type {ChessName, ChessBasic, ChessLocation, ChessSet, EmptyChessSet, Squares, Vector} from './type'
export { getChessName, createEmptyChessSet, getChessSetID, getChessSetTo, getChessSetFrom, createChessSet } from './basic'
export { createSquaresFromChesses, putChessesToSquares, deleteChessesFromSquares, updateSquaresFromChessSets, getChessesByOneVector, getChessByTwoVector, getChessesByEightVector, getChessByFourVector} from './squares'
