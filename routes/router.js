import express from "express";
import path from "path";
import fs from "fs/promises";
const router = express.Router();
const __dirname = path.resolve();

router.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
});

router.get("/crear", async(req, res)=>{
    try {
        const {archivo, contenido} = req.query;
    const date = new Date();
    const dia = date.getDay();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    fs.writeFile(`uploads/${archivo}`, `${dia <10? "0"+dia : dia}/${mes <10? "0"+mes : mes}/${anio} : ${contenido}`);

    res.send(`Archivo: ${archivo} fue exitosamente guardado en la DB`);
   
    } catch (error) {
        res.status(500).send("Error al crear el archivo")
    }
    
});


router.get("/leer", async(req,res)=>{
    const {archivo2} = req.query;
    try {
        const data = await fs.readFile(`uploads/${archivo2}`, "utf-8");
        res.send(data)
    } catch (err) {
        res.send("no existe el archivo")
    }
});

router.get("/renombrar", async(req, res)=>{
    const {nombre, nuevoNombre} = req.query;

    try {
        await fs.rename(`uploads/${nombre}`, `uploads/${nuevoNombre}`);
        res.send(`Archivo : ${nombre} renombrado a ${nuevoNombre}`)
    } catch (error) {
        res.send("no existe el archivo")
    }
});

router.get("/eliminar", async(req, res)=>{
    const {archivo3} = req.query
    try {
        await fs.unlink(`uploads/${archivo3}`);
        res.send(`Archivo ${archivo3} fue eliminado de la DB`)
    } catch (error) {
        res.send("no existe el archivo")
    }
})

export default router;