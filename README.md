# auth-service
Esta es una API REST desarrollada con Node.js, Express y MongoDB. El sistema implementa un control de acceso basado en roles (RBAC) y una arquitectura de sesiones seguras mediante una triple validación de datos.

# Caractetisticlas Principales
Autenticación Stateless & Stateful: Combina la rapidez de los tokens JWT con el control total de una base de datos de sesiones.

Gestión de Roles: Niveles de acceso diferenciados para admin y user.

Cierre de Sesión Remoto: Los administradores pueden invalidar sesiones de cualquier usuario instantáneamente (por ejemplo, tras un cambio de rol o eliminación de cuenta).

Contenedores Docker: Despliegue rápido y consistente mediante Docker y Docker Compose.

# Arquitectura de Base de Datos
El sistema se apoya en 3 colecciones (tablas) fundamentales en MongoDB:

    Users (users): Almacena las credenciales cifradas (BCrypt), el correo electrónico y la relación con los roles.

    Roles (roles): Define los niveles de autorización del sistema.

    Tokens (tokens): Actúa como una capa de control de sesiones. Permite rastrear qué tokens están activos y da al administrador el poder de revocarlos en tiempo real.

# Tecnologias Utilizadas
Backend: Node.js & Express.

Base de Datos: MongoDB & Mongoose.

Seguridad: JSON Web Tokens (JWT) & BCryptJS.

DevOps: Docker & Docker Compose.

# Instalacion y Despliegue
1. Configurar varialbes de entorno:  Crear un archivo .env en la raiz 
2. Levantar con Docker: docker compose up --build o con sudo si no tienes permisos. 

# Flujo de Seguridad del Proyecto
El proyecto implementa una lógica de validación cruzada:

    El cliente envía el token en el header x-access-token.

    El servidor verifica que el token no ha sido manipulado (Firma JWT).

    Validación de Sesión: El servidor consulta la colección Tokens para verificar si isValid: true.

    Si el Administrador actualiza los roles de un usuario o lo elimina, el sistema marca automáticamente sus tokens como isValid: false, expulsándolo del sistema de inmediato por seguridad.


# Autor
https://github.com/0-frank