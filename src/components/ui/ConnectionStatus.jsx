import React from 'react';
import { useBackendConnection } from '../../hooks/useBackendConnection';

const ConnectionStatus = () => {
  const { isConnected, isLoading, error, lastChecked, checkConnection } = useBackendConnection();

  const getStatusColor = () => {
    if (isLoading) return 'text-yellow-600 bg-yellow-100';
    if (isConnected) return 'text-green-600 bg-green-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusText = () => {
    if (isLoading) return 'Verificando conexión...';
    if (isConnected) return 'Backend conectado';
    return 'Backend desconectado';
  };

  const getStatusIcon = () => {
    if (isLoading) return '🔄';
    if (isConnected) return '🟢';
    return '🔴';
  };

  const formatLastChecked = () => {
    if (!lastChecked) return '';
    return lastChecked.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg shadow-lg border ${getStatusColor()} transition-all duration-300`}>
        <div className="flex items-center gap-2">
          <span className={isLoading ? 'animate-spin' : ''}>{getStatusIcon()}</span>
          <span className="font-medium text-sm">{getStatusText()}</span>
          {!isLoading && (
            <button
              onClick={checkConnection}
              className="ml-2 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
              title="Verificar conexión"
            >
              🔄
            </button>
          )}
        </div>
        
        {lastChecked && (
          <div className="text-xs mt-1 opacity-70">
            Última verificación: {formatLastChecked()}
          </div>
        )}
        
        {error && (
          <div className="text-xs mt-1 text-red-700 max-w-xs break-words">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
