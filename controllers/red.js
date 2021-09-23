import Red from "../models/red.js"

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
        const {codigo, iglesia, felipeS} = req.body;
        const red = Red({codigo, iglesia ,felipeS });

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
}

export default redControllers