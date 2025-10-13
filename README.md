# 👨‍🏫 Vista de Profesores - Sistema de Gestión Académica

## 📘 Descripción
La **vista de Profesores** permite la gestión integral de exámenes finales, actas, correlativas, planes curriculares y alumnos.  
Está desarrollada en **Angular 17**, utilizando **Signals**, **Standalone Components** y **Angular Material**.

---

## 🚀 Funcionalidades Disponibles

### 📅 Fechas de Finales
- Visualización de fechas programadas.
- Modificación de fechas asignadas (si está autorizado).
- Filtrado por carrera, materia o año.

### 📋 Listado de Actas
- Ver y descargar actas de examen en **PDF**.
- Visualizar inscriptos y estado del acta.
- Filtrar por estado (programado, en proceso, cerrado).

### 👨‍🎓 Alumnos Inscriptos
- Listado de alumnos anotados a cada final.
- Filtrado por carrera o año.
- Verificación de condiciones académicas.

### 📘 Correlativas y Plan Curricular
- Visualizar correlativas completas por materia.
- Acceso al plan curricular completo.
- Descarga de listados.

### 📝 Cierre de Actas
- Carga de notas por alumno.
- Confirmación de cierre.
- Edición antes del cierre final.

### 🔔 Notificaciones
- Nuevos alumnos inscriptos.
- Cambios de fechas de finales.
- Recordatorios de cierre de actas.
- Alertas administrativas.

---

## 🧩 Estructura Interna
```bash
src/app/features/profesor/
├── components/
│ ├── dashboard/
│ ├── fechas-finales/
│ ├── listado-actas/
│ ├── correlativas/
│ ├── plan-curricular/
│ └── cierre-acta/
├── profesor.routes.ts
├── profesor.guard.ts
├── profesor.facade.ts
└── profesor-layout.component.ts

```

---

## 🧠 Tecnologías Utilizadas

- **Angular 17**
- **TypeScript**
- **Angular Material**
- **Signals** (reactividad moderna)
- **SCSS** (diseño responsive)
- **Facade Pattern** (coordinación de datos)
- **Guard Pattern** (control de acceso)
- **Routing avanzado con lazy loading**

---

## 🏗️ Flujo de Datos
Login → AuthService → profesorGuard → ProfesorLayoutComponent → Dashboard → ProfesorFacade → Servicios → API

---

## 🔐 Seguridad
- **profesorGuard** protege el acceso a las rutas del módulo.
- Validación del usuario a través del `localStorage` (`user` inicia con “profesor”).
- Redirección automática al login si no cumple los permisos.

---

## 💡 Mejores Prácticas
- Componentes standalone.
- Uso de `inject()` en lugar de `constructor`.
- Variables reactivas con `signal()` y `computed()`.
- División clara entre **presentación (componentes)** y **lógica (facades)**.

---

## 📈 Próximas Mejoras
- Implementar carga real desde backend.
- Añadir indicadores de carga (spinners).
- Integrar exportación avanzada (PDF/Excel).
- Mejorar gestión de notificaciones internas.
