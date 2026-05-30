import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// Configure axios to always send cookies (session credentials) with every request
axios.defaults.withCredentials = true;

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount — called once when the app boots
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await axios.get("/api/me");
        if (response.data.success) {
          setUser(response.data.data.user);
        } else {
          setUser(null);
        }
      } catch {
        // Guest user — no active session, silently ignore 401
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  /**
   * Log in with email + password.
   * Returns the authenticated user object on success.
   * Throws an Error on failure.
   */
  const login = async (email, password) => {
    const res = await axios.post("/api/login", { email, password });
    if (res.data.success) {
      setUser(res.data.data.user);
      return res.data.data.user;
    }
    throw new Error(res.data.message || "Login failed. Please check your credentials.");
  };

  /**
   * Register a new customer account.
   * Returns the new user object on success.
   */
  const register = async (firstName, lastName, email, password, passwordConfirmation) => {
    const res = await axios.post("/api/register", {
      first_name:            firstName,
      last_name:             lastName,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    if (res.data.success) {
      setUser(res.data.data.user);
      return res.data.data.user;
    }
    throw new Error(res.data.message || "Registration failed.");
  };

  /**
   * Log out the current user and clear the local session state.
   */
  const logout = async () => {
    try {
      await axios.post("/api/logout");
    } catch (err) {
      // Even if the server call fails (e.g. already expired), clear local state
      console.warn("Logout API call failed:", err?.response?.status);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
