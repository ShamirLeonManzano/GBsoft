import Publicacion from '../models/publicacion.js';
import cloudinary from 'cloudinary';


const publicacionControllers = {
    publicacionGet: async (req, res) => {
        const value = req.query.value;
        const publicacion = await Publicacion
            .find({
                $or: [
                    { titulo: new RegExp(value, 'i') },
                ]
            }) 
            res.json({
            publicacion
        })
    },

    publicacionGetById: async (req, res) => {
        const { id } = req.params
        const publicacion = await Publicacion.findById(id)

        res.json({
            publicacion
        })
    },

    publicacionPost : async (req, res) => {
        const {estado, titulo, descripcion} = req.body;
        const publicacion = Publicacion({estado, titulo, descripcion });

        await publicacion.save();

        res.json({
            publicacion
        })
    },

    publicacionPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const publicacion = await Publicacion.findByIdAndUpdate(id, resto)

        res.json({
         publicacion
        })
    },

    publicacionPutActivar: async (req, res) => {
        const { id } = req.params

        const publicacion = await Publicacion.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            publicacion
        })
    },

    publicacionPutDesactivar: async (req, res) => {
        const { id } = req.params

        const publicacion = await Publicacion.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            publicacion
        })
    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           
            
            let publicacion = await Publicacion.findById(id);            
            if(publicacion.archivo){
                const nombreTemp=publicacion.archivo.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            publicacion = await Publicacion.findByIdAndUpdate(id,{archivo:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let publicacion = await Publicacion.findOne({_id:id});
            if(publicacion.archivo){
                return res.json({url:publicacion.archivo})

            }
            res.status(400).json({msg:'Falta Archivo'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}

export default publicacionControllers