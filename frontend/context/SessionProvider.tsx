import { useState, createContext, useEffect } from 'react';
import { getUser } from '../services/AirdropService';
import { supabase } from '../services/SuperbaseService';
import { Session } from '@supabase/supabase-js';

type ContextType = {
  session: Session | null;
  user: User | null;
  logOut: () => void;
};

type Props = {
  children?: React.ReactNode;
};

export const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
  logOut: () => {},
});

export const SessionProvider: React.FC<Props> = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    loadUser(session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      loadUser(session);
    });
  }, []);

  const loadUser = async (session: Session | null) => {
    if (session !== null && session.provider_token) {
      const user = await getUser(session.provider_token);
      console.log('Hey', user);
      setUser(user);
    }
  };

  const logOut = async () => {
    setUser(null);
    setSession(null);
    await supabase.auth.signOut();
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        session,
        logOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
