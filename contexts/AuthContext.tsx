import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get('token') || null);

  useEffect(() => {
    Cookies.set('token', token || '');
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
