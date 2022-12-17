const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

exports.crearUsuario = async (req, res) => {
   //console.log(req.body);
   const { password, email } = req.body;
   //res.json({msg:"desde el controller post"});
   try {
      //validadr unico correo
      let usuario= await Usuario.findOne({email});
      if(usuario){
         return res.status(400).json({msg:"el usuario ya existe"});
      }
      //crear un nuevo usuario
      usuario = new Usuario(req.body);
      //has
      usuario.password = await bcryptjs.hash(password, 10);
      //Guardar usuario en la db
      const usuarioAlmacenado = await usuario.save();
      res.json(usuarioAlmacenado);

   } catch (error) {
      console.log(error);
   }
}