# Proyecto backend Anuncios
- Este proyecto es el backend para anuncios clasificados
---
## Paso para levantar el Proyecto
```bash
npm install
node src/index.js
```
Servidor: `http://127.0.0.1:3000`

## Endpoints (datos en memoria, sin BD)

### Categorías
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/categorias` | Lista todas las categorías |
| GET | `/api/categorias/:id` | Obtiene una categoría |
| POST | `/api/categorias` | Crea una categoría |
| PUT | `/api/categorias/:id` | Actualiza una categoría |
| DELETE | `/api/categorias/:id` | Elimina una categoría |

Body de ejemplo:
```json
{ "nombre": "Tecnología", "descripcion": "Celulares y PCs" }
```

### Publicaciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/publicaciones` | Lista publicaciones (filtros: `?categoriaId=1`, `?estado=disponible`) |
| GET | `/api/publicaciones/:id` | Obtiene una publicación |
| POST | `/api/publicaciones` | Crea una publicación |
| PUT | `/api/publicaciones/:id` | Actualiza una publicación |
| DELETE | `/api/publicaciones/:id` | Elimina una publicación |

Body de ejemplo:
```json
{
  "titulo": "iPhone 13",
  "descripcion": "128 GB, impecable",
  "precio": 700,
  "categoriaId": 1,
  "estado": "disponible"
}
```

> Los datos se guardan en arrays en memoria, por lo que se reinician cada vez que se reinicia el servidor.