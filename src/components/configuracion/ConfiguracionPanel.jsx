import React from "react";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { toast } from "sonner";
import { apiFetch } from "../../services/api";
import { useBackendConnection } from "../../hooks/useBackendConnection";
import ApiStatsMonitor from "../ui/ApiStatsMonitor";

const ConfiguracionPanel = () => {
  const { isConnected, isLoading, error, lastChecked, endpoint, checkConnection } = useBackendConnection();

  const verificarBackend = async () => {
    try {
      await apiFetch("/ping");
      toast.success("Conexión al backend exitosa", { closeButton: true });
    } catch {
      toast.error("No se pudo conectar al backend", { closeButton: true });
    }
  };

  const verificarDB = async () => {
    try {
      const res = await apiFetch("/ping?db=1");
      if (res && res.db) {
        toast.success("Conexión a la base de datos exitosa", { closeButton: true });
      } else {
        throw new Error();
      }
    } catch {
      toast.error("No se pudo conectar a la base de datos", { closeButton: true });
    }
  };

  return (
    <div className="m-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Estado de Conexión al Backend</Card.Title>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Estado: </strong>
                <Badge 
                  bg={isLoading ? 'warning' : isConnected ? 'success' : 'danger'}
                  className="ms-2"
                >
                  {isLoading ? 'Verificando...' : isConnected ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>
              
              {lastChecked && (
                <div className="mb-3">
                  <strong>Última verificación: </strong>
                  {lastChecked.toLocaleString('es-ES')}
                </div>
              )}
              
              {endpoint && (
                <div className="mb-3">
                  <strong>Endpoint activo: </strong>
                  <code>{endpoint}</code>
                </div>
              )}
              
              {error && (
                <div className="mb-3">
                  <strong>Error: </strong>
                  <span className="text-danger">{error}</span>
                </div>
              )}
            </Col>
            
            <Col md={6}>
              <div className="mb-3">
                <strong>URL del Backend: </strong>
                <code>{import.meta.env.VITE_API_URL || 'No configurada'}</code>
              </div>
            </Col>
          </Row>
          
          <Button 
            variant="primary" 
            className="me-2" 
            onClick={checkConnection}
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Verificar Conexión'}
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Pruebas de Conectividad</Card.Title>
          <Button variant="secondary" className="me-2" onClick={verificarBackend}>
            Verificar endpoint /ping
          </Button>
          <Button variant="success" onClick={verificarDB}>
            Verificar conexión a la base de datos
          </Button>
        </Card.Body>
      </Card>

      <ApiStatsMonitor />
    </div>
  );
};

export default ConfiguracionPanel;
