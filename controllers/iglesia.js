import Iglesia from "../models/iglesia.js";
import cloudinary from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL)

const iglesiaControllers = {

    iglesiaGet: async (req, res) => {
        const query = req.query.value
        const iglesias = await Iglesia.find({
            $or: [
                { codigo: new RegExp(query, 'i') },
            ]
        });

        res.json({
            iglesias
        })
    },

    iglesiaGetById: async (req, res) => {
        const { id } = req.params
        const iglesia = await Iglesia.findById(id)

        res.json({
            iglesia
        })
    },
    
    iglesiaPost: async (req, res) => {
        const { codigo, estado, titulo } = req.body;
        const iglesia = Iglesia({ codigo, estado, titulo });

        await iglesia.save();

        res.json({
            iglesia
        })
    },

    iglesiaPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const iglesia = await Iglesia.findByIdAndUpdate(id, resto)

        res.json({
            iglesia
        })
    },

    iglesiaPutActivar: async (req, res) => {
        const { id } = req.params

        const iglesia = await Iglesia.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            iglesia
        })
    },

    iglesiaPutDesactivar: async (req, res) => {
        const { id } = req.params

        const iglesia = await Iglesia.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            iglesia
        })
    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           
            
            let iglesia = await Iglesia.findById(id);
             
            if(iglesia.foto){
                const nombreTemp=iglesia.foto.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            iglesia = await Iglesia.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let iglesia = await Iglesia.findOne({_id:id});
            if(iglesia.foto){
                return res.json({url:iglesia.foto})

            }
            res.status(400).json({msg:'Falta Imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}

export default iglesiaControllers