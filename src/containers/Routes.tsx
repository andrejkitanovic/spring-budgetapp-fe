import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ROUTES:
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import Notes from "./notes";
import Settings from "./settings";

const RoutesComponent: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
