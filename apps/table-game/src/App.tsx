import { Route, Routes } from 'react-router-dom';
import { Login } from "./page/login";
import { Root } from "./layout/root";
import { Main } from "./page/main";
import { LockRegistration } from './page/lockRegistration'
// import { ExcelUpdatePage } from './pages/ExcelUpdate'
// import { Layout } from './layout'

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Root />}>
        <Route path="lockRegistration" element={<LockRegistration />} />
        <Route path="" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;