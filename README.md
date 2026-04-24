# 🌐 Frontend_exercise_prueba — Cliente Web BiblioGestión

## Descripción

Interfaz de usuario moderna y responsiva desarrollada con **HTML5**, **Vanilla CSS** (diseño premium) y **JavaScript (ES6+)**. Utiliza la librería **Axios** para el consumo de servicios REST de la API de backend.

---

## 🎨 Características de Diseño

- **Estética Premium**: Tema oscuro con acentos violetas, sombras suaves y bordes redondeados.
- **Glassmorphism**: Efectos de desenfoque en la navegación para una sensación moderna.
- **Micro-animaciones**: Transiciones suaves al cambiar de pestaña y al mostrar formularios.
- **Diseño Responsivo**: Adaptable a móviles, tablets y escritorio.
- **Feedback Visual**: Sistema de notificaciones (Toasts) para informar sobre el éxito o error de las operaciones.

---

## 📂 Estructura de Carpetas

```
Frontend_exercise_prueba/
├── index.html          # Estructura principal de la aplicación
├── css/
│   └── styles.css      # Diseño, variables y animaciones
├── js/
│   ├── api.js          # Configuración de Axios y utilidades globales
│   ├── usuarios.js     # Lógica CRUD de Usuarios
│   ├── libros.js       # Lógica CRUD de Libros
│   ├── prestamos.js    # Lógica CRUD de Préstamos
│   └── app.js          # Inicialización y manejo de pestañas
└── README.md           # Este archivo
```

---

## 🚀 Cómo Ejecutar

1. Asegúrate de que el **Backend** esté corriendo en `http://localhost:8080`.
2. Simplemente abre el archivo `index.html` en cualquier navegador moderno.
3. ¡Listo! Puedes empezar a gestionar usuarios, libros y préstamos.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| HTML5 | - | Estructura semántica y accesibilidad |
| CSS3 | - | Diseño premium, Flexbox, Grid y Animaciones |
| JavaScript | ES6+ | Lógica de la aplicación y manipulación del DOM |
| Axios | 1.x (CDN) | Consumo de API REST (HTTP Client) |
| Google Fonts | Inter | Tipografía moderna y legible |

---

## 📋 Funcionalidades Implementadas

### 👤 Usuarios
- Listado completo de usuarios registrados.
- Creación de nuevos usuarios con validación.
- Edición de datos de usuarios existentes.
- Eliminación de usuarios (con confirmación).

### 📖 Libros
- Visualización del catálogo de libros con estado de disponibilidad.
- Registro de nuevos libros en el sistema.
- Actualización de información bibliográfica.
- Eliminación de libros del catálogo.

### 🔄 Préstamos
- Gestión de la relación entre usuarios y libros (entidad secundaria).
- Carga dinámica de usuarios y libros en formularios.
- Registro de préstamos con fechas y estados (Activo, Devuelto, Vencido).
- Seguimiento de devoluciones y actualización de estados.