import SubRed from '../models/subRed.js'
import cloudinary from 'cloudinary'


cloudinary.config(process.env.CLOUDINARY_URL)

const subRedControllers = {

    subRedGet: async (req, res) => {
        const value = req.query.value;
        const subRed = await SubRed
            .find({
                $or: [
                    { codigo: new RegExp(value, 'i') },
                ]
            })
            .populate('iglesia','codigo')
            .populate('usuario','nombre')
            .sort({ 'codigo': -1 })

        res.json({
            subRed
        })
    },

    subRedGetById: async (req, res) => {
        const { id } = req.params
        const subRed = await SubRed.findById(id)

        res.json({
            subRed
        })
    },

    subRedGetByRed: async (req, res) => {
        const { id } = req.params
        const subRed = await SubRed.find({red:id}) 

        res.json({
            subRed
        })
    },

    subRedPost: async (req, res)=>{
        const { codigo, estado, red, felipeR } = req.body;
        const subRed = SubRed({ codigo, estado, red, felipeR });

        await subRed.save();

        res.json({
            subRed
        })
    },

    subRedPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const subRed = await SubRed.findByIdAndUpdate(id, resto)

        res.json({
            subRed
        })
    },

    subRedPutActivar: async (req, res) => {
        const { id } = req.params

        const subRed = await SubRed.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            subRed
        })
    },

    subRedPutDesactivar: async (req, res) => {
        const { id } = req.params

        const subRed = await SubRed.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            subRed
        })
    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           
            
            let subRed = await SubRed.findById(id);  
               
            if(subRed.foto){
                const nombreTemp=subRed.foto.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            subRed = await SubRed.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let subRed = await SubRed.findOne({_id:id});
            if(subRed.foto){
                return res.json({url:subRed.foto})

            }
            res.status(400).json({msg:'Falta Imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}

export default subRedControllers

