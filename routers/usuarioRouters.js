const express = require('express');
const router = express.Router();
const usuarioController= require("../controllers/usuariosControllers")

router.post(
    '/', 
    usuarioController.crearUsuario
);

/*
router.get("/data/",(req,res)=>{
    res.json({msg:"desde el router get"})
});

router.post("/",(req,res)=>{
    res.json({msg:"desde el router postes crear"})
});

router.put("/",(req,res)=>{
    res.json({msg:"desde el router put ACTUALIZAR"})
});

router.delete("/",(req,res)=>{
    res.json({msg:"desde el router delete BORRAT"})
});
*/
module.exports = router
