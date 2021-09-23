import Publicacion from '../models/publicacion.js'

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
}

export default publicacionControllers