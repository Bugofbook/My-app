/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SquaresDeepCopy ,setChessToSquares} from "@my-app-game/chess/chess/oldGameBasic";

const makeEmptyBoard = (row,column) => SquaresDeepCopy(Array(row).fill(Array(column).fill({value:"", owner:"", lock: false})))

const makeGameHistoryObject = (board,objecta = {}) => Object.assign({	nowplayer: "player1"},{squares: board},objecta)
	
const makeGameInfoObject = (gamename) => ({
	gamename,
	gamestate: "Game Begin",
	winner: "",
	loser: "",
	turns: 0,
	actionlists: [],
})

const BoardProcessedChess = (chessarray, Board) => {
	chessarray.reduce((presquares,nowchess) => setChessToSquares(nowchess,presquares),Board)
	return Board
	}

//

const TicTacToeBoard = makeEmptyBoard(3,3)
const TicTacToeNeedKey = {showlists : []}

export const TicTacToeInitialData = {
	history: [makeGameHistoryObject(TicTacToeBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("TicTacToe"),
}

export const TicTacToeSpecialInitialData = {
	history: [makeGameHistoryObject(TicTacToeBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("TicTacToeSpecial"),
}

//
const GomokuBoard = makeEmptyBoard(15,15)
export const GomokuInitialData = {
	history: [makeGameHistoryObject(GomokuBoard,TicTacToeNeedKey)],
	gameinfo: makeGameInfoObject("Gomoku"),
}

//
	
const  OthelloStartArray = [
	{rowskey: 3, columnskey: 3, value: "BlackChess", owner: "player1", lock: true},
	 {rowskey: 3, columnskey: 4, value: "WhiteChess", owner: "player1", lock: true},
	 {rowskey: 4, columnskey: 3, value: "WhiteChess", owner: "player1", lock: true},
	 {rowskey: 4, columnskey: 4, value: "BlackChess", owner: "player1", lock: true}
]

const  OthelloStartBoard = makeEmptyBoard(8,8)

const OthelloBoard = BoardProcessedChess(OthelloStartArray,OthelloStartBoard)

const OthelloNeedKey = { player1chess:  2,	player2chess:  2 }

export const OthelloInitialData = {
	history: [makeGameHistoryObject(OthelloBoard,OthelloNeedKey)],
	gameinfo: makeGameInfoObject("Othello"),
}
