import Informe from '../models/informe.js'

const informeControllers = {
    informeGet: async (req, res) =>{
        const value = req.query.value
        const informe = await Informe.find({
            $or:[
                {tipo: new RegExp(value,'i')},                
            ]
        })
        .sort({'createAt':1})
        .populate('usuario','nombre')        
         
        res.json({
          informe
        })

    },

    informeGetById: async (req, res) => {
        const { id } = req.params;
        const informe = await Informe.findOne({ _id: id })
        res.json({
            informe
        })
    },
    informeGetByIDL: async (req, res) => {
        const { id } = req.params;
        const informe = await Informe.findOne({ iDL : id })
        res.json({
            informe
        })
    },

    informePost : async (req, res) => {
        const {usuario, iDL, codigo, tipo, totalAm, totalC, totalAD, totalF, total, fGrupo, fAyudante, fAnfitrion,fMaestro, felipes, discipulos, amigosA, niñosA, reconciliados, nuevos, adultos,           
        niñosC, hermanos , amigosAD, niñosAD, diezmo, ofrenda, otros, } = req.body

        const informe = Informe({usuario, iDL, codigo, tipo, totalAm, totalC, totalAD, totalF, total, fGrupo, fAyudante, fAnfitrion,fMaestro, felipes, discipulos, amigosA, niñosA, reconciliados, nuevos, adultos,           
        niñosC, hermanos, amigosAD, niñosAD, diezmo, ofrenda, otros,})

        await informe.save();

        res.json({
            informe
        })
    },

    informePutActivar: async (req, res) => {
        const { id } = req.params
        const informe = await Informe.findByIdAndUpdate(id, { estado: 1 })      

        res.json({
            informe
        })
    },

    informePutDesactivar: async (req, res) => {
        const { id } = req.params
        const informe = await Informe.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            informe
        })
    },
}

export default informeControllers