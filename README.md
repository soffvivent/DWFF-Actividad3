# 🏢 NexusCoworking - Sistema de Reserva de Espacios

Aplicación web desarrollada con **Vue 3** para la gestión y reserva de espacios de coworking en la librería universitaria Nexus.

## 📋 Descripción

NexusCoworking es una plataforma moderna que permite a los usuarios explorar y reservar espacios de trabajo colaborativo. La aplicación combina una interfaz intuitiva con funcionalidades avanzadas de filtrado y validación de reservas.

## ✨ Características Principales

- 🎯 **Catálogo de Espacios**: Visualización de 12 espacios diferentes obtenidos desde API
- 🔍 **Filtros Avanzados**: Búsqueda por planta (1ª, 2ª, 3ª) y capacidad (1, 2-4, 5-8, 9+ personas)
- 📝 **Sistema de Reservas**: Formulario completo con validación en tiempo real
- 💾 **Gestión de Estado**: Implementación con Pinia para manejo centralizado de datos
- 📱 **Diseño Responsive**: Adaptado a dispositivos móviles, tablets y desktop
- ⚡ **Rendimiento Optimizado**: Carga dinámica y caché de datos

## 🚀 Tecnologías Utilizadas

- **Vue 3** - Framework JavaScript progresivo
- **Vite 6.0.1** - Build tool y servidor de desarrollo
- **Vue Router 4.5.0** - Enrutamiento SPA
- **Pinia 2.3.0** - Gestión de estado
- **ESLint** - Linter para calidad de código
- **Prettier** - Formateo de código

## 📂 Estructura del Proyecto

```
NexusCoworking/
├── public/                     # Archivos estáticos
│   └── favicon.ico
├── src/
│   ├── assets/                 # Recursos (imágenes, estilos)
│   ├── components/             # Componentes reutilizables
│   │   ├── NavbarComponent.vue # Barra de navegación
│   │   └── SpaceCard.vue       # Tarjeta de espacio
│   ├── router/                 # Configuración de rutas
│   │   └── index.js
│   ├── stores/                 # Stores de Pinia
│   │   └── reservationStore.js # Gestión de reservas
│   ├── views/                  # Vistas/Páginas
│   │   ├── HomeView.vue        # Página de inicio
│   │   ├── SpacesView.vue      # Catálogo de espacios
│   │   └── CheckoutView.vue    # Finalizar reserva
│   ├── App.vue                 # Componente raíz
│   ├── main.js                 # Punto de entrada
│   └── style.css               # Estilos globales
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nexus-coworking.git
cd nexus-coworking/NexusCoworking
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

4. **Compilar para producción**
```bash
npm run build
```

5. **Vista previa de producción**
```bash
npm run preview
```

## 📄 Páginas de la Aplicación

### 🏠 Home (Landing Page)
**Ruta:** `/`

Página de bienvenida que incluye:
- Sección hero con presentación del coworking
- Grid de servicios destacados
- Galería de espacios disponibles
- Información sobre beneficios
- Call-to-action para comenzar la reserva

### 🏢 Espacios
**Ruta:** `/spaces`

Catálogo completo de espacios con:
- **12 espacios** obtenidos dinámicamente desde API
- **Filtros interactivos:**
  - Por planta (1ª, 2ª, 3ª)
  - Por capacidad (1 persona, 2-4, 5-8, 9+)
- **Información por espacio:**
  - Nombre del espacio
  - Capacidad y descripción
  - Planta ubicada
  - Precio por hora
  - Imagen representativa
- **Botón de reserva** que redirige al checkout con el espacio seleccionado

### ✅ Checkout
**Ruta:** `/checkout`

Página de finalización de reserva con:
- **Resumen del espacio seleccionado** con toda la información
- **Formulario de reserva** con validación:
  - Nombre completo (obligatorio, mín. 3 caracteres)
  - Email (obligatorio, formato válido)
  - Fecha de reserva (obligatoria, no puede ser pasada)
  - Hora de reserva (obligatoria)
  - Comentarios adicionales (opcional)
- **Validación en tiempo real** con mensajes de error descriptivos
- **Confirmación visual** tras completar la reserva exitosamente
- **Manejo de estados:** Sin espacio seleccionado, formulario activo, confirmación

## 🔧 Funcionalidades Técnicas

### Gestión de Estado (Pinia)

```javascript
// reservationStore.js
- rooms: Array de espacios desde API
- selectedRoom: ID del espacio seleccionado
- currentReservation: Datos de la reserva actual
- fetchRooms(): Obtener espacios desde API
- selectRoom(id): Seleccionar espacio para reservar
- saveReservation(data): Guardar datos de reserva
```

### Enrutamiento (Vue Router)

```javascript
// router/index.js
Routes:
- / → HomeView
- /spaces → SpacesView
- /checkout → CheckoutView
```

### Integración con API

- **Endpoint:** `https://mock.apidog.com/m1/1069422-1057565-default/rooms`
- **Método:** GET
- **Respuesta:** Array de objetos con información de espacios
- **Estados manejados:**
  - Loading (cargando datos)
  - Success (datos obtenidos)
  - Error (fallo en la petición)

## 🎨 Diseño y Estilos

- **Contenedor principal:** 1200px de ancho máximo
- **Sistema de grid:** Responsive con CSS Grid y Flexbox
- **Paleta de colores:**
  - Primario: #3b82f6 (Azul)
  - Secundario: #10b981 (Verde)
  - Texto: #1f2937 (Gris oscuro)
  - Fondo: #f9fafb (Gris claro)
- **Animaciones:** Transiciones suaves y efectos hover
- **Mobile-first:** Diseño adaptativo desde 320px hasta 1920px

## 📱 Responsive Design

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint

# Format
npm run format
```

## 🔒 Validaciones Implementadas

### Formulario de Reserva

- ✅ **Nombre:** Obligatorio, mínimo 3 caracteres
- ✅ **Email:** Obligatorio, formato válido (regex)
- ✅ **Fecha:** Obligatoria, no puede ser anterior a hoy
- ✅ **Hora:** Obligatoria
- ✅ **Comentarios:** Opcional

## 🌐 API Utilizada

```
GET https://mock.apidog.com/m1/1069422-1057565-default/rooms

Response:
[
  {
    "id": 1,
    "name": "Sala Innovación",
    "capacity": "2-4",
    "planta": 1,
    "price": 15,
    "image": "https://example.com/image.jpg"
  },
  ...
]
```

## 📦 Dependencias Principales

```json
{
  "vue": "^3.5.13",
  "vue-router": "^4.5.0",
  "pinia": "^2.3.0"
}
```

## 🤝 Contribución

Este proyecto es parte de una actividad académica del Máster en Desarrollo Web.

## 👥 Autor

[Tu Nombre] - Máster en Desarrollo Web con Frameworks Front-end

## 📅 Fecha

Diciembre 2025

## 📝 Licencia

Este proyecto es de uso académico.

---

## 📸 Capturas de Pantalla

### Página de Inicio
![Home](docs/screenshots/home.png)

### Catálogo de Espacios
![Espacios](docs/screenshots/spaces.png)

### Formulario de Reserva
![Checkout](docs/screenshots/checkout.png)

---

## 🔗 Enlaces

- **Repositorio:** [GitHub](https://github.com/tu-usuario/nexus-coworking)
- **Demo en vivo:** [Vercel/Netlify](https://tu-deploy.vercel.app)

---

## ✅ Checklist de Requisitos

- [x] Aplicación creada con herramienta de generación (Vite)
- [x] Tres páginas implementadas
- [x] Enlaces de navegación en todas las páginas
- [x] Contenido completo y profesional
- [x] Código de enrutamiento en archivo independiente
- [x] Nomenclatura correcta (PascalCase, camelCase)
- [x] `.gitignore` configurado (sin node_modules)
- [x] Diseño responsive con contenedor de 1200px
- [x] Imágenes, textos y columnas en cada página

---

**Desarrollado con ❤️ usando Vue 3 + Vite**