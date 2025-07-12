import React, { useState, useEffect } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import api from '../../services/api';

const ApiStatsMonitor = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    lastError: null,
    requestHistory: []
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  // Función para registrar una petición
  const logRequest = (success, responseTime, error = null) => {
    setStats(prev => {
      const newHistory = [
        ...prev.requestHistory.slice(-9), // Mantener solo las últimas 10
        {
          timestamp: new Date(),
          success,
          responseTime,
          error
        }
      ];

      const totalRequests = prev.totalRequests + 1;
      const successfulRequests = prev.successfulRequests + (success ? 1 : 0);
      const failedRequests = prev.failedRequests + (success ? 0 : 1);
      
      // Calcular tiempo promedio de respuesta
      const validResponseTimes = newHistory
        .filter(req => req.success && req.responseTime)
        .map(req => req.responseTime);
      
      const averageResponseTime = validResponseTimes.length > 0
        ? validResponseTimes.reduce((a, b) => a + b, 0) / validResponseTimes.length
        : 0;

      return {
        totalRequests,
        successfulRequests,
        failedRequests,
        averageResponseTime,
        lastError: error || prev.lastError,
        requestHistory: newHistory
      };
    });
  };

  // Función para probar la API periódicamente
  const testApiPeriodically = async () => {
    if (!isMonitoring) return;

    const startTime = Date.now();
    
    try {
      await api.health();
      const responseTime = Date.now() - startTime;
      logRequest(true, responseTime);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      logRequest(false, responseTime, error.message);
    }
  };

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(testApiPeriodically, 10000); // Cada 10 segundos
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const successRate = stats.totalRequests > 0 
    ? ((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1)
    : 0;

  return (
    <Card className="mt-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>Monitor de API en Tiempo Real</Card.Title>
          <div>
            <button
              className={`btn btn-sm ${isMonitoring ? 'btn-danger' : 'btn-success'}`}
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? '⏹️ Detener' : '▶️ Iniciar'} Monitor
            </button>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="text-center">
              <div className="h4 text-primary">{stats.totalRequests}</div>
              <small className="text-muted">Total Peticiones</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="h4 text-success">{stats.successfulRequests}</div>
              <small className="text-muted">Exitosas</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="h4 text-danger">{stats.failedRequests}</div>
              <small className="text-muted">Fallidas</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="h4 text-info">{successRate}%</div>
              <small className="text-muted">Tasa de Éxito</small>
            </div>
          </div>
        </div>

        {stats.averageResponseTime > 0 && (
          <div className="mb-3">
            <strong>Tiempo promedio de respuesta: </strong>
            <Badge bg={stats.averageResponseTime < 1000 ? 'success' : stats.averageResponseTime < 3000 ? 'warning' : 'danger'}>
              {Math.round(stats.averageResponseTime)} ms
            </Badge>
          </div>
        )}

        {stats.requestHistory.length > 0 && (
          <div>
            <h6>Historial Reciente</h6>
            <Table size="sm" striped>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Tiempo (ms)</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {stats.requestHistory.slice().reverse().map((request, index) => (
                  <tr key={index}>
                    <td>{request.timestamp.toLocaleTimeString('es-ES')}</td>
                    <td>
                      <Badge bg={request.success ? 'success' : 'danger'}>
                        {request.success ? '✅' : '❌'}
                      </Badge>
                    </td>
                    <td>{request.responseTime || '-'}</td>
                    <td className="text-danger small">
                      {request.error ? request.error.substring(0, 50) + '...' : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {isMonitoring && (
          <div className="mt-3">
            <small className="text-muted">
              🔄 Monitoreando conexión cada 10 segundos...
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ApiStatsMonitor;
