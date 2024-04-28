import { useContext, createContext, PropsWithChildren, useState } from "react";
type User = {id: number};

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, isSignedIn } = props;

  const [user] = useState<User | null>(isSignedIn ? { id: 1 } : null);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
