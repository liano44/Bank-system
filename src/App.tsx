import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { useContext } from 'react';
import { AuthContext, authContextProps } from './context/authContext';

function App() {
  const { isAuth } = useContext(AuthContext) as authContextProps;

  return (
    <Routes>
      {isAuth
        ? privateRoutes.map(({path, element: Component}) => <Route path={path} element={<Component />} />)
        : publicRoutes.map(({path, element: Component}) => <Route path={path} element={<Component />} />)}
    </Routes>
  );
}

export default App;
