# ✂️ Sistema de Gestión de Turnos - Peluquería

Aplicación fullstack para gestionar turnos de una peluquería.  
Desarrollado con Node.js + Express + MongoDB en el backend y React.js en el frontend.

---

## 🛠️ Tecnologías utilizadas

- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Frontend:** React.js
- **Base de datos:** MongoDB (local)

---

## 📁 Estructura del proyecto

peluqueria-app/
├── backend/
│   ├── src/
│   │   ├── config/        → Conexión a MongoDB
│   │   ├── controllers/   → Lógica de negocio
│   │   ├── middlewares/   → Validaciones
│   │   ├── models/        → Esquema de datos
│   │   └── routes/        → Rutas de la API
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md

---

## ⚙️ Requisitos previos

- Node.js instalado
- MongoDB instalado y corriendo

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>

### 2. Configurar el Backend
cd backend
npm install

Crear un archivo `.env` en la carpeta `backend` con:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/peluqueria

Iniciar el servidor:
npm run dev

El backend corre en: http://localhost:3001

### 3. Configurar el Frontend
cd frontend
npm install
npm start

El frontend corre en: http://localhost:3000

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /turnos | Listar todos los turnos |
| GET | /turnos?nombre=X | Buscar por nombre |
| GET | /turnos?estado=X | Filtrar por estado |
| GET | /turnos/:id | Obtener turno por ID |
| POST | /turnos | Crear nuevo turno |
| PUT | /turnos/:id | Actualizar turno |
| DELETE | /turnos/:id | Eliminar turno |

## 📡 API REST - Endpoints

Base URL: `http://localhost:3001`

---

### GET /turnos
Retorna todos los turnos. Acepta filtros por query params.

**Query params opcionales:**
- `nombre` → busca por nombre (parcial, sin distinción de mayúsculas)
- `estado` → filtra por estado (pendiente, confirmado, cancelado)

**Ejemplo:**
GET http://localhost:3001/turnos
GET http://localhost:3001/turnos?nombre=maximo
GET http://localhost:3001/turnos?estado=pendiente

---

### GET /turnos/:id
Retorna un turno específico por su ID.

**Ejemplo:**
GET http://localhost:3001/turnos/69d2ef8a82ef01e58d551477

---

### POST /turnos
Crea un nuevo turno.

**Body (JSON):**
```json
{
  "nombre": "Maximo",
  "servicio": "Corte",
  "fecha": "2026-04-06",
  "hora": "10:00"
}
```

**Respuesta exitosa (201):**
```json
{
  "_id": "...",
  "nombre": "Maximo",
  "servicio": "Corte",
  "fecha": "2026-04-06",
  "hora": "10:00",
  "estado": "pendiente",
  "createdAt": "...",
  "updatedAt": "..."
}
```
---

### PUT /turnos/:id
Actualiza un turno existente.

**Body (JSON):**
```json
{
  "nombre": "Maximo",
  "servicio": "Corte y Barba",
  "fecha": "2026-04-06",
  "hora": "11:00",
  "estado": "confirmado"
}
```

---

### DELETE /turnos/:id
Elimina un turno por su ID.

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Turno eliminado correctamente"
}
```

---

### Errores comunes

| Código | Descripción |
|--------|-------------|
| 400 | Campos obligatorios faltantes |
| 404 | Turno no encontrado |
| 500 | Error interno del servidor |

## 👨‍💻 Autor

Desarrollado por **Maximo Colman**  
Materia: Taller de Lenguajes de Programación III  
Instituto Politécnico Formosa — 2026