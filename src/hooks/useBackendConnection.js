import { useState, useEffect } from 'react';
import api from '../services/api';

export const useBackendConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    isLoading: true,
    error: null,
    lastChecked: null
  });

  const checkConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Usar el método de salud específico del API
      const result = await api.health();
      
      setConnectionStatus({
        isConnected: true,
        isLoading: false,
        error: null,
        lastChecked: new Date(),
        endpoint: result.endpoint
      });
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        isLoading: false,
        error: error.message,
        lastChecked: new Date()
      });
    }
  };

  useEffect(() => {
    // Verificar conexión al montar el componente
    checkConnection();
    
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...connectionStatus,
    checkConnection
  };
};
