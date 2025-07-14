// ErrorBoundary.jsx
// Componente para capturar errores de JavaScript y evitar que la aplicación se caiga completamente.
// Muestra un mensaje de error amigable al usuario en lugar de una pantalla en blanco.

import React from 'react';
import { Card, Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registra el error
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // UI de error personalizada
      return (
        <div className="container mt-5">
          <Card className="text-center">
            <Card.Body>
              <Alert variant="danger">
                <Alert.Heading>¡Oops! Algo salió mal</Alert.Heading>
                <p>
                  La aplicación ha encontrado un error inesperado. 
                  Esto puede ocurrir por problemas de conexión con el servidor.
                </p>
                <hr />
                <div className="d-flex justify-content-center gap-2">
                  <Button 
                    variant="primary" 
                    onClick={() => window.location.reload()}
                  >
                    Recargar página
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      this.setState({ hasError: false, error: null, errorInfo: null });
                    }}
                  >
                    Intentar de nuevo
                  </Button>
                </div>
              </Alert>
              
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-3 text-start">
                  <summary>Detalles del error (solo desarrollo)</summary>
                  <pre className="mt-2 p-2 bg-light rounded">
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </Card.Body>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
