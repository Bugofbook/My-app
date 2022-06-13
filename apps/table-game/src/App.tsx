import { Route, Routes } from 'react-router-dom';
import { Login } from "./page/login";
import { Root } from "./layout/root";
import { Main } from "./page/main";
import { LockRegistration } from './page/lockRegistration'
import { OthelloPage } from './page/catch/othello'
import { TicTacToePage } from './page/connect/tictactoe'
import { TicTacToeSpecialPage } from './page/connect/tictactoespecial'
import { GomokuPage } from './page/connect/gomoku'
// import { ExcelUpdatePage } from './pages/ExcelUpdate'
// import { Layout } from './layout'

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Root />}>
        <Route path="/othello" element={<OthelloPage />} />
        <Route path="/tictactoe" element={<TicTacToePage />} />
        <Route path="/tictactoespecial" element={<TicTacToeSpecialPage />} />
        <Route path="/gomoku" element={<GomokuPage />} />
        <Route path="" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;