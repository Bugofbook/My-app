import { ChessSet } from '@my-app-game/chess/chess'

import { useState, useCallback } from 'react';


type GameState = ["Playing", "End"]

type GameResult<PlayersName extends Array<string>> = {
  winner: PlayersName[number] | Array<PlayersName[number]> | '',
  loser: PlayersName[number] | Array<PlayersName[number]> | '',
}
type setGameInfo<ChessSet, PlayersName extends Array<string>> = ({actionList, player, gameState, result}: {
  actionList: Array<ChessSet>,
  player: PlayersName[number],
  gameState: GameState[number],
  result: GameResult<PlayersName>
}) => void

type addAction<ChessSet> = (action: Array<ChessSet>) => void
type updateGameInfo<PlayersName extends Array<string>> = ({player, gameState, result}: {
  player: PlayersName[number],
  gameState?: GameState[number],
  result?: GameResult<PlayersName>
}) => void

type useGameInfoReturn<ChessSet, PlayersName extends Array<string>> = [
  {
    actionList: Array<ChessSet>,
    turns: number,
    player: PlayersName[number],
    result: GameResult<PlayersName>,
    gameState: GameState[number],
  },
  {
    addAction: addAction<ChessSet>,
    setGameInfo: setGameInfo<ChessSet, PlayersName>,
    updateGameInfo: updateGameInfo<PlayersName>,
  }
]

export function useGameInfo<PlayersName extends Array<string>>({startList, startPlayer, startState}: {startList: Array<ChessSet>, startPlayer: PlayersName[number], startState: GameState[number]}): useGameInfoReturn<ChessSet, PlayersName> {
  const [actionList, setActionList] = useState<Array<ChessSet>>(startList)
  const [player, setPlayer] = useState<PlayersName[number]>(startPlayer)
  const [result, setResult] = useState<GameResult<PlayersName>>({winner: '', loser: ''})
  const [gameState, setGameState] = useState<GameState[number]>(startState)
  const addAction: addAction<ChessSet> = useCallback((action) => {
    setActionList(list => list.concat(action))
  }, [])
  const setGameInfo: setGameInfo<ChessSet, PlayersName> = useCallback(({actionList, player, gameState, result}) => {
    setActionList(actionList)
    setPlayer(player)
    setGameState(gameState)
    setResult(result)
  }, [])
  const updateGameInfo: updateGameInfo<PlayersName> = useCallback(({player, gameState, result}) => {
    setPlayer(player)
    if (gameState) {
      setGameState(gameState)
    }
    if (result) {
      setResult(result)
    }
  }, [])
  return [{
    actionList,
    turns: actionList.length,
    player,
    result,
    gameState,
  }, {
    addAction,
    setGameInfo,
    updateGameInfo,
  }]
}
