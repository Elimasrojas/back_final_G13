const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    //llere el token desde el header
    const token= req.header("x-auth-token")
    console.log(token);

    if(!token){
        return res.status(400).json({ mdg: "no hay toquen"});
    }
    //validar el token
    try {
        const cifrado= jwt.verify(token, process.env.SECRETA);
        req.usuario=cifrado.usuario;
        //console.log(cifrado.usuario);
        next();
    } catch (error) {
        return res.status(400).json({ msg: "Token no valido"});
    }
}

