# 🎓 Sistema de Gestión Académica

## 📘 Descripción General
El **Sistema de Gestión Académica** es una aplicación web desarrollada en **Angular 17** que permite la administración integral de alumnos, profesores, directivos, administrativos y técnicos dentro de un entorno educativo.  
El proyecto está orientado a la **gestión de exámenes finales**, actas, correlativas, planes curriculares y notificaciones.

---

## 🚀 Funcionalidades Principales

### 👨‍🏫 Profesores
- Gestión de fechas de finales (crear, modificar, visualizar).
- Cierre de actas y carga de notas.
- Listado de alumnos inscriptos y no inscriptos.
- Descarga de actas y correlativas.
- Visualización del plan curricular y correlativas.
- Recepción de notificaciones de alumnos y administrativos.

### 👨‍🎓 Alumnos
- Inscripción y cancelación de finales.
- Verificación automática de correlativas.
- Visualización de materias habilitadas.
- Consulta de historial académico y descarga de comprobantes.
- Notificaciones de fechas, recordatorios y novedades.

### 👨‍💼 Administrativos
- Gestión de usuarios (crear, aprobar, modificar, eliminar).
- Control y asignación de fechas de finales.
- Reportes de inscripciones, notas y estadísticas académicas.
- Envío de notificaciones masivas o personalizadas.

### 👨‍💻 Directivos
- Supervisión de estadísticas generales del sistema.
- Validación y aprobación de fechas de finales.
- Recepción de alertas administrativas y cambios en la planificación.

### 🔧 Técnicos
- Acceso completo al sistema.
- Verificación, auditoría y pruebas de todas las funcionalidades.
- Gestión integral de usuarios, fechas y reportes.

---

## 🏗️ Estructura del Proyecto

```bash
src/app/
├── features/
│   ├── profesor/
│   ├── alumno/
│   ├── admin/
│   ├── director/
│   └── tecnico/
├── guards/
├── services/
└── pages/

```

---

## ⚙️ Instalación y Ejecución

# Clonar el repositorio
git clone https://github.com/usuario/sistema-academico.git

# Instalar dependencias
npm install

# Ejecutar la aplicación
ng serve
Accede desde: http://localhost:4200

🔒 Sistema de Autenticación y Roles
El sistema valida el rol del usuario mediante Guards, que controlan el acceso a cada sección.
La autenticación se maneja desde el AuthService con almacenamiento local (localStorage) y redirección automática según el tipo de usuario.

📡 Comunicación con el Backend
Pendiente de implementación:

Se prevé una API RESTful en .NET Core para conectar con la base de datos académica y gestionar usuarios, fechas y actas.

🧩 Próximos pasos
Integración del API Service con backend real.

Implementación de manejo de errores y loaders visuales.

Añadir testing unitario y documentación en el código.

Optimizar manejo de estado con Signals + RxJS.
