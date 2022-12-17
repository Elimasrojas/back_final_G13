const mongoose = require("mongoose")

const conectarDB = async () =>{
    try {        
        const connection= await mongoose.connect(
            "mongodb+srv://admin:Colombia2022@cluster0.bvts3kn.mongodb.net/test",{
                useNewUrlParser:true,
                UseUnifiedTopology:true
            });
            const url= `${connection.connection.host}:${connection.connection.port}`
            console.log(`MongoDB conectado a: ${url}`);
    } catch (error) {
        console.error(`error: ${error.message}`)
        process.exit(1);
    }
}

module.exports = conectarDB;