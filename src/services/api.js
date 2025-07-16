// api.js
// Servicio centralizado para realizar peticiones HTTP al backend.
// Usa fetch, variables de entorno para la URL base y maneja errores globalmente.

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://mapclientes-backend.fly.dev/api";

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorMsg = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Distinguir entre errores de red y otros errores
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Error de conexión: No se pudo conectar al servidor");
    }
    throw error;
  }
}

// Métodos cortos para post y get
const api = {
  post: async (endpoint, data) => {
    return apiFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  get: async (endpoint) => {
    return apiFetch(endpoint);
  },
  // Método específico para verificar la salud del backend
  health: async () => {
    try {
      // Intenta diferentes endpoints comunes para verificar la salud
      const endpoints = ["/health", "/status", "/ping", "/"];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            return {
              status: "connected",
              endpoint,
              timestamp: new Date().toISOString(),
            };
          }
        } catch {
          // Continúa con el siguiente endpoint
          continue;
        }
      }

      throw new Error("Ningún endpoint de salud disponible");
    } catch (error) {
      throw new Error(`Error de conexión: ${error.message}`);
    }
  },
  // Puedes agregar put, delete, etc. si lo necesitas
};

export default api;
