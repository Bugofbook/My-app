/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// set chess to a square
export const setChessToSquares = (chess, squares) => {
	squares[chess.rowskey][chess.columnskey] = {value: chess.value, owner: chess.owner, lock: chess.lock}
	return squares
}
// add chess to list
export const addChessToLists = (chess={}, lists=[]) => lists.concat([chess])
//take one square form Squares ex:TakeSquare(1,1)(nowsquares)
export const TakeSquare = (rowskey, columnkey) => Squares  => Squares[rowskey][columnkey]
//check squre's lock ex:Checklock(nowsquare)
export const CheckSquareLock = (Square) => Square.lock
//check square exist
export const CheckSquareExist = (rowslength,columnslength)  => (rowskey, columnskey) => rowskey >= 0 && rowskey < rowslength && columnskey >= 0 && columnskey < columnslength
//check squre's value
export const CheckSquareValue = Value => Square => {
	return(Square.value  === Value) ? 1 : 0
}
// copy squares
export const SquaresDeepCopy = (Squares) => Squares.map((rows) => rows.map((columns) => Object.assign({}, columns)))
