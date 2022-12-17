const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "variables.env" })


exports.autenticarUsuario = async (req, res) => {
    const { password, email } = req.body;
    //console.log(`pass: ${password}`);
    //console.log(`email: ${email}`);
    try {
        //validadr que el cooreo este regirado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: "el usuario no existe" });
        }
        //validar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(404).json({ msg: "el pass es invalido" });
        }
        //si todo es correcto  crear y firmar un token
        let payload = {
            usuario: { id: usuario.id },
            nombre: usuario.nombre
        }
        //res.json(payload);
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '30d'
            }, (error, token) => {
                if (error) throw error;
                //mensaje de confirmacion
                res.json({ token })
            }
        );

        console.log("permitir ingresar");

    } catch (error) {
        console.log(`error authController ${error}`);
    }
}

exports.usuarioAutenticado = async (req, res) => {
    
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario });
        console.log("usuarioAutenticado")
    } catch (error) {
        res.status(403).json({ msg: "Hubo un error" });
    }
}