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

interface AuthStorage {
  token: string;
  expiry: number;
}

interface JwtPayload {
  id?: string;
  email?: string;
  name?: string;
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
    const stored = sessionStorage.getItem("auth");

    if (stored) {
      try {
        const parsed: AuthStorage = JSON.parse(stored);

        if (Date.now() > parsed.expiry) {
          // expired
          sessionStorage.removeItem("auth");
        } else {
          setTokenState(parsed.token);

          const payload = parseJwt(parsed.token);
          if (payload) {
            setUser({
              id: payload.id,
              email: payload.email ?? "",
              name: payload.name || "User",
            });
          }
        }
      } catch {
        sessionStorage.removeItem("auth");
      }
    }

    setInitialized(true);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days

      const data: AuthStorage = {
        token,
        expiry,
      };

      sessionStorage.setItem("auth", JSON.stringify(data));
      setTokenState(token);

      const payload = parseJwt(token);
      if (payload) {
        setUser({
          id: payload.id,
          email: payload.email ?? "",
          name: payload.name || "User",
        });
      }

      toast.success("Login successful");
    } else {
      sessionStorage.removeItem("auth");
      setTokenState(null);
      setUser(null);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    setTokenState(null);
    setUser(null);
    toast.success("Session expired");
  };


  useEffect(() => {
    if (!token) return;

    const stored = sessionStorage.getItem("auth");
    if (!stored) return;

    const parsed: AuthStorage = JSON.parse(stored);
    const timeout = parsed.expiry - Date.now();

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);

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

function parseJwt(token: string): JwtPayload | null {
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