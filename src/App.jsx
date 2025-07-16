import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientesPanel from "./components/clientes/ClientesPanel";
import CamionesPanel from "./components/camiones/CamionesPanel";
import DiasEntregaPanel from "./components/diasEntrega/DiasEntregaPanel";
import Menu from "./components/menu/MenuPrincipal";
import Login from "./components/auth/Login";
import Header from "./components/auth/Header";
import Dashboard from "./components/Dashboard";
import { Toaster } from "sonner";
import ConfiguracionPanel from "./components/configuracion/ConfiguracionPanel";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated()) {
    return (
      <ErrorBoundary>
        <Login onLogin={login} />
        <Toaster position="top-right" richColors />
      </ErrorBoundary>
    );
  }

  // Si está autenticado, mostrar la aplicación
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header user={user} onLogout={logout} />
        <Menu />
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ClientesPanel />} />
          <Route path="/camiones" element={<CamionesPanel />} />
          <Route path="/dias-entrega" element={<DiasEntregaPanel />} />
          <Route path="/configuracion" element={<ConfiguracionPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
