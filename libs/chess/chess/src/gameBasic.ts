// set chess to a square
interface Chess {
    value: string;
    owner: string;
    lock: boolean;
}

interface ChessInfo extends Chess {
	rowskey: number;
	columnskey: number;
}

type Squares = Array<Array<Chess>>

interface setChessToSquares {
    (chessInfo: ChessInfo, squares: Squares): Squares;
}
type ChessList<T> = Array<T>

interface addChessToLists {
    (chess: Chess, lists?: ChessList<Chess>): ChessList<Chess>;
}

type TakeSquare = (rowskey: number, columnkey: number) => (Squares: Squares) => Chess
type SquaresDeepCopy = (Squares: Squares) => Squares
export const setChessToSquares: setChessToSquares = (chessInfo, squares) => {
	const { rowskey, columnskey, ...others } = chessInfo;
	squares[rowskey][columnskey] = { ...squares[rowskey][columnskey], ...others}
	return squares
}
// add chess to list
export const addChessToLists: addChessToLists = (chess , lists=[]) => lists.concat([chess])
//take one square form Squares ex:TakeSquare(1,1)(nowsquares)
export const TakeSquare: TakeSquare = (rowskey, columnkey) => Squares  => Squares[rowskey][columnkey]
// copy squares
export const SquaresDeepCopy: SquaresDeepCopy = (Squares) => Squares.map((rows) => rows.map((columns) => Object.assign({}, columns)))

//check squre's lock ex:Checklock(nowsquare)
// export const CheckSquareLock = (Square) => Square.lock
//check square exist
// export const CheckSquareExist = (rowslength,columnslength)  => (rowskey, columnskey) => rowskey >= 0 && rowskey < rowslength && columnskey >= 0 && columnskey < columnslength
//check squre's value
// export const CheckSquareValue = Value => Square => {
// 	return (Square.value  === Value) ? 1 : 0
// }
