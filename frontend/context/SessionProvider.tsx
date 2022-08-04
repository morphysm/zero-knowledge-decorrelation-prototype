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
    // Check active sessions and sets the user
    const session = supabase.auth.session()

    setSession(session);
    loadUser(session?.provider_token)

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        loadUser(session?.provider_token)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  // TODO use user metadata from supabase
  const loadUser = async (token: string | null | undefined) => {
    if (token) {
      const user = await getUser(token);
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
