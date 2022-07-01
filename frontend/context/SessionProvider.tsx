import { useState, createContext, useEffect } from 'react';
import { getRewardsByUser } from '../services/AirdropService';

const BEARER_TOKEN_KEY: string = 'BearerToken';

type ContextType = {
  bearerToken: string;
  user: User | null;
  setBearerToken: (bearerToken: string) => void;
};

type Props = {
  children?: React.ReactNode;
};

export const SessionContext = createContext<ContextType>({
  bearerToken: '',
  user: null,
  setBearerToken: () => {},
});

export const SessionProvider: React.FC<Props> = ({ children }: Props) => {
  const [bearerToken, setBearerTokenInternal] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bearerToken = localStorage.getItem(BEARER_TOKEN_KEY);
    if (bearerToken) {
      setBearerTokenInternal(bearerToken);
    }
  });

  useEffect(() => {
    if (bearerToken === '') {
      setUser(null);
      return;
    }
    // TODO dedicated user call
    getRewardsByUser(bearerToken).then((data) => {
      setUser(data.user);
    });
  }, [bearerToken]);

  const updateLocalStorage = (key: string, value: string) => {
    if (value === '') {
      return localStorage.removeItem(key);
    }
    return localStorage.setItem(key, value);
  };

  const setBearerToken = (bearerToken: string) => {
    updateLocalStorage(BEARER_TOKEN_KEY, bearerToken);
    setBearerTokenInternal(bearerToken);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        bearerToken,
        setBearerToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
