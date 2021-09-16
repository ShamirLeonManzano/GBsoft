import mongoose from 'mongoose'

const informeSchema = mongoose.Schema({
    codigo : {type: String, required:true, maxlength:50, unique:true},
    estado : {type:Number, default:1},
    createAt : {type:Date, default:Date.now},
    detalle: [{
        fGrupo: {type: Number, required: true }, // 1 - 0 
        fAyudante: {type: Number, required: true }, // 1 - 0 
        fAnfitrion: {type: Number, required: true }, // 1 - 0 
        fMaestro: {type: Number, required: true }, // 1 - 0 
        Felipes: {type: Number, required: true }, 
        Discipulos : {type: Number, required: true },
        Amigos : {type: Number, required: true },
        Niños : {type: Number, required: true },
        Reconciliados : {type: Number, required: true },
        Nuevos : {type: Number, required: true },
        // Total
        Adultos: {type: Number, required: true },
        Niños: {type: Number, required: true },
        // Total: 
        Hermanos : {type: Number, required: true },
        Amigos : {type: Number, required: true },
        Niños: {type: Number, required: true },
        // Total: {type: Number, required: true },
        Diezmo : {type: Number, required: true },
        Ofrenda: {type: Number, required: true },
        // Total
        Otros: {type: Number, required: true },

    }]
})

export default mongoose.model('Informe', informeSchema)