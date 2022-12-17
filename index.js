const express = require("express");
const conectarDB = require("./config/db")
const usuariosRouters = require("./routers/usuarioRouters")
const authRouters = require("./routers/authRouters");
const categoriaRouters = require("./routers/categoriaRouters");
const productoRouters = require('./routers/productoRouters');
const cors=require("cors");

//conectar base de datos
conectarDB();

const app = express();
//habilitar los cors
app.use(cors());
//(habilitar expre.json)
app.use(express.json({ extended: true }));

//rutas router
/*
app.use("/",(req,res)=>{
    //res.send("hola mundo")
     res.json({msg:"hola mundo"})
});
*/
/*
app.get('/about', function (req, res) {
    res.send('about');
});

app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});
*/
app.use("/api/usuarios", usuariosRouters)
app.use("/api/auth", authRouters)
app.use("/api/categoria", categoriaRouters)
app.use("/api/producto", productoRouters)

app.listen(4000, () => {
    console.log("servidor corriendo en el puerto: 4000");
});