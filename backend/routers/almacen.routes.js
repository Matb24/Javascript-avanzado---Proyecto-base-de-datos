import express from "express";
import { 
    agregarProducto, 
    obtenerProductos, 
    actualizarProducto, 
    eliminarProducto
} from "../controllers/almacen.controllers.js";

const router = express.Router();

// Rutas para CRUD de productos en el almacén
router.post("/almacen", agregarProducto);
router.get("/almacen", obtenerProductos);
router.put("/almacen/:id", actualizarProducto);
router.delete("/almacen/:id", eliminarProducto);

export default router;
