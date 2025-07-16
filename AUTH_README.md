# Sistema de Autenticación MapaClientes

## 🔐 Sistema de Login Implementado

Se ha implementado un sistema de autenticación completo con JWT para la aplicación MapaClientes.

### ✅ Características Implementadas:

1. **Login Form** - Formulario de inicio de sesión con Bootstrap
2. **JWT Authentication** - Autenticación con tokens JWT
3. **Auto-logout** - Cierre automático de sesión al expirar el token
4. **User Header** - Header con información del usuario logueado
5. **Protected Routes** - Todas las rutas protegidas por autenticación
6. **Persistent Login** - Mantiene la sesión al refrescar la página

### 🚀 Cómo Usar:

#### 1. Credenciales de Prueba:
```
Email: test@test.com
Contraseña: 123456
```

#### 2. Flujo de Autenticación:
- La aplicación verifica si hay un token válido al cargar
- Si no hay token, muestra el formulario de login
- Al hacer login exitoso, guarda el token en localStorage
- Todas las peticiones API incluyen automáticamente el token
- Si el token expira (401), automáticamente redirige al login

#### 3. Funcionalidades del Header:
- Muestra nombre y rol del usuario
- Dropdown con información completa del usuario
- Botón de cerrar sesión

### 🛠️ Componentes Creados:

1. **`/src/components/auth/Login.jsx`** - Formulario de login
2. **`/src/components/auth/Header.jsx`** - Header con info de usuario
3. **`/src/hooks/useAuth.js`** - Hook para manejar autenticación
4. **`/src/services/api.js`** - Actualizado para incluir tokens JWT

### 📡 Endpoints API Utilizados:

- `POST /api/usuarios/login` - Autenticación de usuario
- `POST /api/usuarios` - Crear nuevo usuario
- `GET /api/usuarios/users` - Obtener lista de usuarios

### 🎨 Estilos:

- **Bootstrap 5** - Para componentes UI
- **Font Awesome** - Para iconos
- **Bootswatch Flatly** - Tema de Bootstrap
- **Responsive Design** - Adaptable a móviles

### 🔧 Configuración:

El sistema está configurado para:
- Funcionar con el backend en `https://mapclientes-backend.fly.dev/api`
- Manejar errores de autenticación automáticamente
- Guardar estado de autenticación en localStorage
- Incluir token en todas las peticiones API

### 🚨 Seguridad:

- Tokens JWT con expiración
- Logout automático al expirar token
- Limpieza automática de datos al cerrar sesión
- Headers de autorización en todas las peticiones

¡El sistema está listo para usar! 🎉
