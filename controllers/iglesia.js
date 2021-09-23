import Iglesia from "../models/iglesia.js";

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
        const { codigo, estado } = req.body;
        const iglesia = Iglesia({ codigo, estado });

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
}

export default iglesiaControllers