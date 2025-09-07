import React, { createContext, useContext, useReducer, useEffect } from "react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  avatar?: string;
  lastLogin?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          dispatch({ type: "SET_LOADING", payload: true });

          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (
              data.success &&
              (data.user.role === "admin" || data.user.role === "moderator")
            ) {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: data.user, token },
              });
            } else {
              // User is not admin/moderator, logout
              localStorage.removeItem("token");
              dispatch({ type: "LOGOUT" });
            }
          } else {
            // Token is invalid
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: "LOGIN_START" });

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if user is admin or moderator
        if (data.user.role === "admin" || data.user.role === "moderator") {
          localStorage.setItem("token", data.token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data.user, token: data.token },
          });
          return true;
        } else {
          // User is not authorized for dashboard access
          dispatch({ type: "LOGIN_FAILURE" });
          throw new Error("Access denied. Admin or moderator role required.");
        }
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.error("Login error:", error);
      // Re-throw the error so the LoginModal can catch it
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred during login");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return state.user?.role === "admin";
  };

  const value: AuthContextType = {
    state,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Higher-order component for protecting admin routes
export const withAdminAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { state } = useAuth();

    if (state.isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      );
    }

    if (
      !state.isAuthenticated ||
      (state.user?.role !== "admin" && state.user?.role !== "moderator")
    ) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Access Denied
            </h2>
            <p className="text-white/80">
              You need admin or moderator privileges to access this dashboard.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
