import Almacen from "../models/almacen.model.js";

// Crear un nuevo producto en el almacén
export const agregarProducto = async (req, res) => {
    const { nombre, peso, cantidad, fechaIngreso, estado, proveedor, descripcion } = req.body;

    try {
        const nuevoProducto = new Almacen({
            nombre,
            peso,
            cantidad,
            fechaIngreso,
            estado,
            proveedor,
            descripcion
        });

        const productoGuardado = await nuevoProducto.save();
        res.status(201).json({
            message: "Producto agregado exitosamente",
            producto: productoGuardado
        });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ message: "Error al agregar producto" });
    }
};

// Obtener todos los productos del almacén
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Almacen.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// Actualizar un producto por ID
export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, peso, cantidad, fechaIngreso, estado, proveedor, descripcion } = req.body;

    try {
        const productoActualizado = await Almacen.findByIdAndUpdate(
            id,
            { nombre, peso, cantidad, fechaIngreso, estado, proveedor, descripcion },
            { new: true }
        );
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({
            message: "Producto actualizado exitosamente",
            producto: productoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

// Eliminar un producto por ID
export const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const productoEliminado = await Almacen.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};

// Esta función también elimina la obtención de imágenes, ya que no necesitamos más la URL de la imagen
export const obtenerImagenes = async (req, res) => {
    try {
        const productos = await Almacen.find({}, { idProducto: 1, imagenURL: 1, _id: 0 });
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        res.status(500).json({ message: "Error al obtener imágenes" });
    }
};

// Obtener información completa de un producto por idProducto
export const obtenerProductoPorId = async (req, res) => {
    const { idProducto } = req.params;

    try {
        const producto = await Almacen.findOne({ idProducto });
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

