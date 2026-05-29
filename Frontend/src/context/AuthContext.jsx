import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await axios.get("/api/me");
        if (response.data.success) {
          setUser(response.data.data.user);
        }
      } catch (err) {
        // Silent catch for guest users
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const login = async (email, password) => {
    // 1. Initialize CSRF protection cookie (standard handshake)
    try {
      await axios.get("/api/me").catch(() => {});
    } catch (e) {}

    // 2. Perform Login
    const res = await axios.post("/api/login", { email, password });
    if (res.data.success) {
      setUser(res.data.data.user);
      return res.data.data.user;
    } else {
      throw new Error(res.data.message || "Failed to log in");
    }
  };

  const register = async (firstName, lastName, email, password, passwordConfirmation) => {
    // 1. Initialize CSRF protection cookie (standard handshake)
    try {
      await axios.get("/api/me").catch(() => {});
    } catch (e) {}

    // 2. Perform Register
    const res = await axios.post("/api/register", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    if (res.data.success) {
      setUser(res.data.data.user);
      return res.data.data.user;
    } else {
      throw new Error(res.data.message || "Failed to register");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
