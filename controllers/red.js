import Red from "../models/red.js"
import cloudinary from 'cloudinary'


cloudinary.config(process.env.CLOUDINARY_URL)

const redControllers = {

    redGet: async (req, res) => {
        const value = req.query.value;
        const red = await Red
            .find({
                $or: [
                    { codigo: new RegExp(value, 'i') },
                ]
            })
            .populate('iglesia','codigo')
            .populate('usuario','nombre')
            .sort({ 'codigo': -1 })

        res.json({
            red
        })
    },

    redGetById: async (req, res) => {
        const { id } = req.params
        const red = await Red.findById(id)

        res.json({
            red
        })
    },

    redPost: async (req,res) => {
        const { titulo, codigo, iglesia, felipeS} = req.body;
        const red = Red({titulo, codigo, iglesia ,felipeS });

        await red.save();

        res.json({
            red
        })
    },

    redPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const red = await Red.findByIdAndUpdate(id, resto)

        res.json({
            red
        })
    },

    redPutActivar: async (req, res) => {
        const { id } = req.params

        const red = await Red.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            red
        })
    },

    redPutDesactivar: async (req, res) => {
        const { id } = req.params

        const red = await Red.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            red
        })
    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           
            
            let red = await Red.findById(id);
             
            if(red.foto){
                const nombreTemp=red.foto.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            red = await Red.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let red = await Red.findOne({_id:id});
            if(red.foto){
                return res.json({url:red.foto})

            }
            res.status(400).json({msg:'Falta Imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}

export default redControllers