import SubRed from '../models/subRed.js'

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
}

export default subRedControllers

