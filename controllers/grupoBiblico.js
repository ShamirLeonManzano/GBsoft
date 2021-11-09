import GrupoBiblico from "../models/grupoBiblico.js";
import cloudinary from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL)

const grupoBiblicoControllers = {

    grupoBiblicoGet: async (req, res) => {
        const value = req.query.value;
        const grupoBiblico = await GrupoBiblico
            .find({
                $or: [
                    { codigo: new RegExp(value, 'i') },
                ]
            })
            .populate('red','codigo')
            .populate('subRed','codigo')
            .populate('felipeG','nombre')
            .sort({ 'codigo': -1 }) 

        res.json({
            grupoBiblico
        })
    },

    grupoBiblicoGetByIdSubR: async (req, res) => {
        const { id } = req.params;
        const grupoBiblico = await GrupoBiblico
        .find({ subRed : id })        
        .populate('subRed','codigo')
        .populate('felipeG','nombre')
        .sort({ 'codigo': -1 })  

        res.json({
            grupoBiblico
        })
    },

    grupoBiblicoGetById: async (req, res) => {
        const { id } = req.params
        const grupoBiblico = await GrupoBiblico.findById(id)

        res.json({
            grupoBiblico
        })
    },

    grupobiblicoGetByUser: async (req, res) => {
        const { id } = req.params
        const grupoBiblico = await GrupoBiblico.find({felipeG:id}) 

        res.json({
            grupoBiblico
        })
    },
    
    grupoBiblicoPost: async (req, res) => {
        const {titulo, codigo, direccion, felipeG,telefono, subRed} = req.body;
        const grupo = GrupoBiblico({titulo, codigo, direccion,felipeG,telefono,subRed});

        await grupo.save();

        res.json({
            grupo
        })
    },

    grupoBiblicoPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const grupoBiblico = await GrupoBiblico.findByIdAndUpdate(id, resto)

        res.json({
            grupoBiblico
        })
    },

    grupoBiblicoPutActivar: async (req, res) => {
        const { id } = req.params

        const grupoBiblico = await GrupoBiblico.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            grupoBiblico
        })
    },

    grupoBiblicoPutDesactivar: async (req, res) => {
        const { id } = req.params

        const grupoBiblico = await GrupoBiblico.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            grupoBiblico
        })
    },

    cargarArchivoCloud: async (req,res) => {
        const {id} = req.params;
        try{            
            const {tempFilePath}=req.files.archivo 
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)           
            
            let grupo = await GrupoBiblico.findById(id);  
               
            if(grupo.foto){
                const nombreTemp=grupo.foto.split('/')
                const nombreArchivo=nombreTemp[nombreTemp.length-1]
                const [public_id] = nombreArchivo.split('.')
                cloudinary.uploader.destroy(public_id)
               
            }
            grupo = await GrupoBiblico.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url});
        }catch (error){
            res.status(400).json(error)
        } 
    },

    traerImagenesCloud: async (req,res) => {
        const {id} = req.params;
        try {
            let grupo = await GrupoBiblico.findOne({_id:id});
            if(grupo.foto){
                return res.json({url:grupo.foto})

            }
            res.status(400).json({msg:'Falta Imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}

export default grupoBiblicoControllers