import { createContext, useState } from 'react';

export type authContextProps = {
  isAuth: boolean;
  authorize: () => void;
};

export const AuthContext = createContext<authContextProps | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authorize = () => {
    setIsAuth(true);
  };

  return <AuthContext.Provider value={{ isAuth, authorize }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
