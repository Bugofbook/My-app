import { Route, Routes } from 'react-router-dom';
import { Login } from "./page/login";
import { Root } from "./layout/root";
import { Main } from "./page/main";
import { OthelloPage } from './page/catchchess/othello'
import { TicTacToePage } from './page/connectchess/tictactoe'
import { TicTacToeSpecialPage } from './page/connectchess/tictactoespecial'
import { GomokuPage } from './page/connectchess/gomoku'

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Root />}>
        <Route path="/catchchess/othello" element={<OthelloPage />} />
        <Route path="/connectchess/tictactoe" element={<TicTacToePage />} />
        <Route path="/connectchess/tictactoespecial" element={<TicTacToeSpecialPage />} />
        <Route path="/connectchess/gomoku" element={<GomokuPage />} />
        <Route path="" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;