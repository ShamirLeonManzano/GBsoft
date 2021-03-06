import Usuario from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import subirArchivo from "../helpers/subir-archivo.js";
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import cloudinary from 'cloudinary'
import { generarJWT } from '../middlewares/validar-jwt.js'

cloudinary.config(process.env.CLOUDINARY_URL)

const usuarioControllers = {

    usuarioGet: async (req, res) => {
        const value = req.query.value
        console.log(value);
        const usuarios = await Usuario.find({
            $or: [
                { rol: new RegExp(value, 'i') },
                { nombre: new RegExp(value, 'i') }
            ]
        });

        res.json({
            usuarios
        })
    },

    mostrarImagen: async (req, res) => {
        const {id} = req.params
        try {
            let usuario = await Usuario.findById(id)
            if(usuario.foto){
                const __dirname=path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage=path.join(__dirname,'../uploads/',usuario.foto);
                if(fs.existsSync(pathImage)){
                    return res.sendFile(pathImage)
                }
            }
            res.status(400).json({msg:'Falta imagen'})
        } catch (err) {
            res.status(400).json({err})
        }
    },

    usuarioGetById: async (req, res) => {
        const { id } = req.params
        const usuario = await Usuario.findById(id)

        res.json({
            usuario
        })
    },

    usuarioPost: async (req, res) => {
        const { codigo, nombre, email, password, rol, telefono } = req.body;
        const usuario = Usuario({ codigo, nombre, email, password, rol, telefono });

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt)

        usuario.save();

        res.json({
            usuario
        })
    },

    usuarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, estado, __v, password, ...resto } = req.body

        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt)
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto)

        res.json({
            usuario
        })
    },

    usuarioPutActivar: async (req, res) => {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            usuario
        })
    },

    usuarioPutDesactivar: async (req, res) => {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            usuario
        })
    },

    cargarArchivo: async (req, res) => {
        const {id} = req.params;
        try{
            console.log(id);
            const nombre = await subirArchivo(req.files,undefined);
            let usuario = await Usuario.findById(id);
            if(usuario.foto){
                const __dirname=path.dirname(url.fileURLToPath(import.meta.url))
                const pathImage=path.join(__dirname,'../uploads/',usuario.foto)
                if(fs.existsSync(pathImage)){
                    fs.unlinkSync(pathImage)
                }
            }
            usuario = await Usuario.findByIdAndUpdate(id,{foto:nombre})
            res.json({nombre});
        }catch (error){
            res.status(400).json(error)
        }

    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{
            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           

            let usuario = await Usuario.findById(id);
            if(usuario.foto){
                const nombreTemp=usuario.foto.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            usuario = await Usuario.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let usuario = await Usuario.findOne({_id:id});
            if(usuario.foto){
                return res.json({url:usuario.foto})

            }
            res.status(400).json({msg:'Falta imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },

    login: async (req,res) => {
        const {email, password}=req.body;

        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.json({
                msg:`Usuario/Password no son correctos email`
            })
        }
        if (usuario.estado===0){
            return res.json({
                msg:`Usuario/Password no son correctos estado`
            })
        }
        const validarPassword=bcryptjs.compareSync(password, usuario.password);
        if (! validarPassword){
            return res.json({
                msg:`Usuario/Password no son correctos `
            }) 
        }

        const token = await generarJWT(usuario.id);

        return res.json({
           usuario,
           token
        })
            
        
    },
}

export default usuarioControllers