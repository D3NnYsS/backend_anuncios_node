// Datos en memoria (sin base de datos)
// Se reinician cada vez que se reinicia el servidor.
let publicaciones = [
    {
        id: 1,
        titulo: "Toyota Corolla 2020",
        descripcion: "Auto en excelente estado, 45.000 km",
        precio: 18500,
        categoriaId: 1,
        estado: "disponible",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        titulo: "Departamento 2 ambientes",
        descripcion: "Centro de la ciudad, luminoso",
        precio: 95000,
        categoriaId: 2,
        estado: "disponible",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

let siguienteId = 3;

// GET /api/publicaciones
// Opcional: ?categoriaId=1  ?estado=disponible
const listar = function (req, res) {
    const { categoriaId, estado } = req.query;

    let resultado = publicaciones;

    if (categoriaId !== undefined) {
        const idCategoria = Number(categoriaId);
        resultado = resultado.filter(function (p) {
            return p.categoriaId === idCategoria;
        });
    }

    if (estado !== undefined) {
        resultado = resultado.filter(function (p) {
            return p.estado === estado;
        });
    }

    return res.status(200).json(resultado);
};

// GET /api/publicaciones/:id
const obtener = function (req, res) {
    const id = Number(req.params.id);
    const publicacion = publicaciones.find(function (p) {
        return p.id === id;
    });

    if (!publicacion) {
        return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    return res.status(200).json(publicacion);
};

// POST /api/publicaciones
const crear = function (req, res) {
    const { titulo, descripcion, precio, categoriaId, estado } = req.body || {};

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
        return res.status(400).json({ mensaje: "El campo 'titulo' es obligatorio" });
    }

    if (precio === undefined || isNaN(Number(precio)) || Number(precio) < 0) {
        return res.status(400).json({ mensaje: "El campo 'precio' debe ser un número mayor o igual a 0" });
    }

    if (categoriaId === undefined || isNaN(Number(categoriaId))) {
        return res.status(400).json({ mensaje: "El campo 'categoriaId' es obligatorio" });
    }

    const publicacion = {
        id: siguienteId++,
        titulo: titulo.trim(),
        descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
        precio: Number(precio),
        categoriaId: Number(categoriaId),
        estado: typeof estado === "string" && estado.trim() ? estado.trim() : "disponible",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    publicaciones.push(publicacion);

    return res.status(201).json(publicacion);
};

// PUT /api/publicaciones/:id
const actualizar = function (req, res) {
    const id = Number(req.params.id);
    const indice = publicaciones.findIndex(function (p) {
        return p.id === id;
    });

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    const { titulo, descripcion, precio, categoriaId, estado } = req.body || {};

    if (titulo !== undefined && (typeof titulo !== "string" || !titulo.trim())) {
        return res.status(400).json({ mensaje: "El campo 'titulo' no puede estar vacío" });
    }

    if (precio !== undefined && (isNaN(Number(precio)) || Number(precio) < 0)) {
        return res.status(400).json({ mensaje: "El campo 'precio' debe ser un número mayor o igual a 0" });
    }

    if (categoriaId !== undefined && isNaN(Number(categoriaId))) {
        return res.status(400).json({ mensaje: "El campo 'categoriaId' debe ser numérico" });
    }

    const publicacion = publicaciones[indice];

    publicaciones[indice] = {
        ...publicacion,
        titulo: titulo !== undefined ? titulo.trim() : publicacion.titulo,
        descripcion: descripcion !== undefined ? String(descripcion).trim() : publicacion.descripcion,
        precio: precio !== undefined ? Number(precio) : publicacion.precio,
        categoriaId: categoriaId !== undefined ? Number(categoriaId) : publicacion.categoriaId,
        estado: estado !== undefined ? String(estado).trim() : publicacion.estado,
        updatedAt: new Date().toISOString(),
    };

    return res.status(200).json(publicaciones[indice]);
};

// DELETE /api/publicaciones/:id
const eliminar = function (req, res) {
    const id = Number(req.params.id);
    const indice = publicaciones.findIndex(function (p) {
        return p.id === id;
    });

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    const publicacion = publicaciones[indice];
    publicaciones.splice(indice, 1);

    return res.status(200).json({
        mensaje: "Publicación eliminada correctamente",
        publicacion,
    });
};

module.exports = {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
};
