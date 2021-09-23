import GrupoBiblico from "../models/grupoBiblico.js";

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
            .populate('usuario','nombre')
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
    
    grupoBiblicoPost: async (req, res) => {
        const {codigo, direccion, felipeG,telefono,red, subRed} = req.body;
        const grupo = GrupoBiblico({codigo, direccion,felipeG,telefono,red, subRed});

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
}

export default grupoBiblicoControllers