import Directorio from '../models/perDirectorio.js'

const perDirectorioControllers = {
    perDirectorioGet: async (req, res) => {
        const value = req.query.value;
        const directorio = await Directorio
            .find({
                $or: [
                    { nombre: new RegExp(value, 'i') },
                ]
            })
            .populate('gBiblico','codigo')         
            

        res.json({
            directorio
        })
    },

    perDirectorioGetById: async (req, res) => {
        const { id } = req.params
        const directorio = await Directorio.findById(id)

        res.json({
            directorio
        })
    },

    perDirectorioGetByGB: async (req, res) => {
        const { id } = req.params
        const directorio = await Directorio.find({gBiblico:id}) 
        res.json({
            directorio
        })
    },

    perDirectorioPost : async (req, res) => {
        const {estado, gBiblico, nombre,cumpleaños, direccion, telefono, email } = req.body;
        const directorio = Directorio({estado, gBiblico, nombre,cumpleaños, direccion, telefono, email  });

        await directorio.save();

        res.json({
            directorio
        })
    },
    
    perDirectorioPut: async (req, res) => {
        const { id } = req.params
        const { _id, estado, __v, ...resto } = req.body

        const directorio = await Directorio.findByIdAndUpdate(id, resto)

        res.json({
            directorio
        })
    },

    // perDirectorioPutActivar: async (req, res) => {
    //     const { id } = req.params

    //     const directorio = await Directorio.findByIdAndUpdate(id, { estado: 1 })

    //     res.json({
    //         directorio
    //     })
    // },

    // perDirectorioPutDesactivar: async (req, res) => {
    //     const { id } = req.params

    //     const directorio = await Directorio.findByIdAndUpdate(id, { estado: 0 })

    //     res.json({
    //         directorio
    //     })
    // },

    perDirectorioDelete: async (req, res) => {
        const { id } = req.params

        const directorio = await Directorio.findByIdAndDelete(id)

        res.json({
            directorio
        })
    },

}

export default perDirectorioControllers