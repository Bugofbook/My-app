/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react';    

const useCenterHook = ({initialstate = {}, canputJudge =f=> f, mainchange = f=> f}) => {
    const [history, setHistory] = useState(initialstate.history);
    const [gameinfo, setGameInfo] = useState(initialstate.gameinfo);
    const jumpto = (step) => {
        if (step === 0) {
          setHistory(initialstate.history)
          setGameInfo(initialstate.gameinfo)
        } else {
          setHistory(history => history.slice(0, step + 1))
          setGameInfo(gameinfo => {
            return {
              ...gameinfo,
              turns: step,
              actionlists: gameinfo.actionlists.slice(0, step),
              gamestate: "Game Playing"          }
          })
        }
      }
    const loadingdata = (gamedata) => {
          window.setTimeout(( () => jumpto(0) ), 0)
          gamedata.chesshistory.reduce((_previousValue,action,index) => window.setTimeout(( () => mainchange(action.rowskey, action.columnskey) ), 1000 * index + 1000), 0)
    }
    const endProcess = (processobject, history, gameinfo) => {
      console.log('aaa')
      const player = history[history.length - 1].nowplayer
      const newHistory = {
        squares: processobject.squares,
        showlists: processobject.lists,
        nowplayer: (player === "player1") ? "player2" : "player1"
      }
      const newGameInfo = {
        actionlists: processobject.actionlists,
        turns: gameinfo.turns + 1,
        gamestate: processobject.gamestate,
        winner: processobject.winner,
        loser: processobject.loser
      }
      setHistory(history => history.concat([newHistory]))
      setGameInfo(gameinfo => ({...gameinfo, ...newGameInfo}))
    }
    const oneClick = (rowskey, columnskey) => {
      if (canputJudge(history, gameinfo, rowskey, columnskey)) {
        const processobject = mainchange(history, gameinfo, rowskey, columnskey)
        endProcess(processobject, history, gameinfo)
      }
    }
    return {
      history,
      gameinfo,
      jumpto,
      loadingdata,
      oneClick
    }
  }

export default useCenterHook