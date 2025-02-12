"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const PermissionsContext = createContext({
  permissions: {},
  updatePermissions: (newPermissions: Record<string, any>) => {}
});

import { ReactNode } from "react";

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState({});

  // Load permissions from localStorage on component mount
  useEffect(() => {
    const savedPermissions = sessionStorage.getItem("userPermissions");
    if (savedPermissions) {
      setPermissions(JSON.parse(savedPermissions));
    }
  }, []);

  // Update the permissions both in state and in localStorage
  const updatePermissions = (newPermissions: Record<string, any>) => {
    setPermissions(newPermissions);
    sessionStorage.setItem("userPermissions", JSON.stringify(newPermissions)); // Save permissions to localStorage
  };

  return (
    <PermissionsContext.Provider value={{ permissions, updatePermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
