import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of our context
type SessionContextType = {
  hasSession: boolean;
  updateSession: (newSessionState: boolean) => void;
};

// Create the context with default values
const SessionContext = createContext<SessionContextType>({
  hasSession: false,
  updateSession: () => {},
});

// Hook to use session context
export const useSession = () => {
  return useContext(SessionContext);
};

type SessionProviderProps = {
  initialSessionState?: boolean;
  children: ReactNode;
};

export const SessionProvider = ({ 
  initialSessionState = false, 
  children 
}: SessionProviderProps) => {
  const [hasSession, setHasSession] = useState<boolean>(initialSessionState);

  const updateSession = (newSessionState: boolean) => {
    setHasSession(newSessionState);
  };

  return (
    <SessionContext.Provider value={{ hasSession, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};