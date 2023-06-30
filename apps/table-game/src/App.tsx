import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Global, css } from '@emotion/react'

import globalTheme from './theme/global'
import { Login } from "./page/login";
import { Layout } from "./layout";
import { Main } from "./page/main";
import { OthelloPage } from './page/catchchess/othello'
import { TicTacToePage } from './page/connectchess/tictactoe'
import { TicTacToeSpecialPage } from './page/connectchess/tictactoespecial'
import { Connect6Page } from './page/connectchess/connect6'
import { GomokuPage } from './page/connectchess/gomoku'

const globalStyles = css`
    html,
    body {
        height: 100%;
        width: 100%;
    }
    #root {
        height: 100%;
        width: 100%;
    }
    .backgroundcolorLightgreen {
      background-color: lightgreen;
    }
    .backgroundcolorYellow {
      background-color: yellow;
    }
`

export const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/catchchess/othello" element={<OthelloPage />} />
          <Route path="/connectchess/tictactoe" element={<TicTacToePage />} />
          <Route path="/connectchess/tictactoespecial" element={<TicTacToeSpecialPage />} />
          <Route path="/connectchess/connect6" element={<Connect6Page />} />
          <Route path="/connectchess/gomoku" element={<GomokuPage />} />
          <Route path="" element={<Main />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
