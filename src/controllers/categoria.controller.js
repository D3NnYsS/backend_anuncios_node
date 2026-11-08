// Datos en memoria (sin base de datos)
// Se reinician cada vez que se reinicia el servidor.
let categorias = [
    {
        id: 1,
        nombre: "Vehículos",
        descripcion: "Autos, motos y otros vehículos",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        nombre: "Inmuebles",
        descripcion: "Casas, departamentos y terrenos",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

let siguienteId = 3;

// GET /api/categorias
const listar = function (req, res) {
    return res.status(200).json(categorias);
};

// GET /api/categorias/:id
const obtener = function (req, res) {
    const id = Number(req.params.id);
    const categoria = categorias.find(function (c) {
        return c.id === id;
    });

    if (!categoria) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    return res.status(200).json(categoria);
};

// POST /api/categorias
const crear = function (req, res) {
    const { nombre, descripcion } = req.body || {};

    if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
        return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }

    const categoria = {
        id: siguienteId++,
        nombre: nombre.trim(),
        descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    categorias.push(categoria);

    return res.status(201).json(categoria);
};

// PUT /api/categorias/:id
const actualizar = function (req, res) {
    const id = Number(req.params.id);
    const indice = categorias.findIndex(function (c) {
        return c.id === id;
    });

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    const { nombre, descripcion } = req.body || {};

    if (nombre !== undefined && (typeof nombre !== "string" || !nombre.trim())) {
        return res.status(400).json({ mensaje: "El campo 'nombre' no puede estar vacío" });
    }

    const categoria = categorias[indice];

    categorias[indice] = {
        ...categoria,
        nombre: nombre !== undefined ? nombre.trim() : categoria.nombre,
        descripcion: descripcion !== undefined ? String(descripcion).trim() : categoria.descripcion,
        updatedAt: new Date().toISOString(),
    };

    return res.status(200).json(categorias[indice]);
};

// DELETE /api/categorias/:id
const eliminar = function (req, res) {
    const id = Number(req.params.id);
    const indice = categorias.findIndex(function (c) {
        return c.id === id;
    });

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    const categoria = categorias[indice];
    categorias.splice(indice, 1);

    return res.status(200).json({
        mensaje: "Categoría eliminada correctamente",
        categoria,
    });
};

module.exports = {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
};
