import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
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
        loading, // 🔥 EXPOSED
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
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");

  return context;
};