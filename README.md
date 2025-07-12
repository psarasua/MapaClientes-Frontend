# 🗺️ Mapas Clientes - Frontend

**Mapas Clientes Frontend** es una aplicación web desarrollada en React para la gestión y visualización de clientes, rutas de reparto, camiones y días de entrega, integrando mapas interactivos y paneles de control visuales.

---

## 🚀 Características principales

- **Gestión de clientes:** Interfaz para visualizar clientes con georreferenciación
- **Panel de control tipo dashboard:** Tarjetas con métricas clave y gráficos visuales  
- **Asignación de camiones y días de entrega:** Organización visual de rutas y recursos
- **Visualización en mapas:** Ubicación de clientes y rutas sobre mapas interactivos
- **Filtros y búsqueda avanzada:** Encuentra clientes y rutas fácilmente
- **Interfaz moderna y responsiva:** Basada en Bootstrap y componentes visuales atractivos

---

## 🏗️ Tecnologías utilizadas

- **React 18** con Vite para desarrollo rápido
- **React Router 7** para navegación
- **Bootstrap 5** para diseño responsivo  
- **Leaflet** para mapas interactivos
- **React Icons** para iconografía

---

## 🛠️ Configuración del proyecto

### Prerrequisitos
- Node.js 18+

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/psarasua/MapaClientes-Frontend.git
cd MapaClientes-Frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Desarrollo local:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

4. **Build para producción:**
```bash
npm run build
```

---

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── clientes/       # Gestión de clientes
│   ├── camiones/       # Gestión de camiones  
│   ├── diasEntrega/    # Días de entrega
│   ├── camionDias/     # Asignaciones camión-día
│   ├── mapas/          # Componentes de mapas
│   ├── menu/           # Menú principal
│   └── ui/             # Componentes UI reutilizables
├── hooks/              # Hooks personalizados
├── services/           # Servicios API
├── utils/              # Utilidades
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada
```

---

## 🛠️ Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción  
- `npm run preview` - Vista previa del build
- `npm run lint` - Ejecutar ESLint

---

## 🔗 Backend

Este frontend se conecta al backend separado disponible en:
[MapaClientes-Backend](https://github.com/psarasua/MapaClientes-Backend)

---

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.
