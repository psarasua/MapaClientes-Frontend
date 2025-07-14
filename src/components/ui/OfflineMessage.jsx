// OfflineMessage.jsx
// Componente para mostrar un mensaje amigable cuando no hay conexión al backend
// Se muestra cuando los datos no se pueden cargar

import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const OfflineMessage = ({ onRetry, message = "No se pudo conectar al servidor" }) => {
  return (
    <Alert variant="warning" className="text-center m-4">
      <FaExclamationTriangle className="me-2" />
      <Alert.Heading>Conexión perdida</Alert.Heading>
      <p>{message}</p>
      <p className="mb-0">
        <small className="text-muted">
          Verifica tu conexión a internet y que el servidor esté disponible.
        </small>
      </p>
      {onRetry && (
        <div className="mt-3">
          <Button variant="outline-warning" onClick={onRetry}>
            <FaRedo className="me-2" />
            Intentar de nuevo
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default OfflineMessage;
