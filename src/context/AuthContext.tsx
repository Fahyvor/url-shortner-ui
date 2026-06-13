import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sleek-toast";

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setTokenState(storedToken);

      const payload = parseJwt(storedToken);
      if (payload) {
        setUser({
          id: payload.id,
          email: payload.email,
          name: payload.name || "User",
        });
      }
    }

    setInitialized(true);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
      setTokenState(token);

      const payload = parseJwt(token);
      if (payload) {
        setUser({
          id: payload.id,
          email: payload.email,
          name: payload.name || "User",
        });
      }

      toast.success("Login successful");
    } else {
      localStorage.removeItem("token");
      setTokenState(null);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
    toast.success("Session terminated");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading: !initialized,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing provider");
  return ctx;
};