const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productoRouters = require('../controllers/productoController');

router.get("/home",productoRouters.leerProductosHome);

router.get("/",authMiddleware,productoRouters.leerProductosAdmin);

router.get("/:id",authMiddleware,productoRouters.leerProductos);

router.post("/",authMiddleware,productoRouters.crearProducto);

router.put("/:id",authMiddleware,productoRouters.actualizarProducto);

router.delete("/:id",authMiddleware,productoRouters.borrarProducto);


module.exports = router