const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

exports.leerProductosHome = async (req, res) => {
  //leer producto por id
  //res.json({mg: 'se ejecuto leer producto'});
  // try {

  //    const producto = await Producto.find();
  //    res.json({ producto });
  // } catch (error) {
  //    console.log(error);
  // }

  const producto = await Producto.find();
  res.json(producto);
};

exports.leerProductosAdmin = async (req, res) => {
  try {
    console.log("leerProductosAdmin");
    const producto = await Producto.find();
    console.log({ creador: req.usuario.id });
    res.json(producto);
  } catch (error) {
    console.log(error);
  }
};

exports.leerProductos = async (req, res) => {
  //leer producto por id
  //res.json({mg: 'se ejecuto leer producto'});
  // try {

  //    const producto = await Producto.find();
  //    res.json({ producto });
  // } catch (error) {
  //    console.log(error);
  // }
  //   const { id } = req.params;
  //   const producto = await Producto.find().where("categoriaId").equals(id);
  //   res.json(producto);
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    res.json({ producto });
  } catch (error) {
    console.log(error);
  }
};
exports.crearProducto = async (req, res) => {
  //res.json({mg: 'se ejecuto crea producto'});
  try {
    //ejemplo de clase
    //const {category1}= req.body;
    // const categoryencontrada = await Category.findById(category1);
    //   if(!categoryencontrada){
    //       return res.status (404).json ({msg: "categoria no encontrada"});
    //    }

    const producto = new Producto(req.body);
    //console.log(producto.categoriaId.toString());
    const categoria = await Categoria.findById({
      _id: producto.categoriaId.toString(),
    });
    if (!categoria) {
      return res.json({ mg: "error al guardar el producto" });
    }
    //console.log(categoria);
    //console.log(producto.categoriaId);
    producto.save();
    res.json(producto);
  } catch (error) {
    console.error(error);
  }
};
exports.actualizarProducto = async (req, res) => {
  //res.json({mg: 'se ejecuto actualizar producto'});
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (!producto) {
    return res.json({ mg: "error al actualizar el producto" });
  }

  producto.nombre = req.body.nombre || producto.nombre;
  producto.descripcion = req.body.descripcion || producto.descripcion;
  producto.stock = req.body.stock || producto.stock;
  producto.precio = req.body.precio || producto.precio;
  producto.imagen = req.body.imagen || producto.imagen;
  producto.categoriaId = req.body.categoriaId || producto.categoriaId;

  producto.save();
  res.json({ producto });
};
exports.borrarProducto = async (req, res) => {
  //res.json({mg: 'se ejecuto borrar producto'});
  try {
    await Producto.deleteOne({ _id: req.params.id });
    res.json({ msg: "producto eliminada" });
  } catch (error) {
    console.log(error);
  }
};
