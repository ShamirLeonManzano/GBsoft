import mongoose from 'mongoose'

const informeSchema = mongoose.Schema({
    usuario : { type: mongoose.Schema.Types.ObjectId, ref: `Usuario`, required: true },
    iDL : { type: mongoose.Schema.Types.ObjectId, ref: `GrupoBiblico`, required: true },
    codigo : {type: String, required:true, maxlength:50, unique:true},
    tipo : { type: String, required: true, maxlength: 20 }, // GB - SB - R - IGL
    estado : {type:Number, default:1},
    createAt : {type:Date, default:Date.now},
    totalA : { type: Number },
    totalC : { type: Number },
    totalAD :{ type: Number },
    totalF : { type: Number },
    total: { type: Number },    
    fGrupo: {type: Number, required: true }, // 1 - 0 
    fAyudante: {type: Number, required: true }, // 1 - 0 
    fAnfitrion: {type: Number, required: true }, // 1 - 0 
    fMaestro: {type: Number, required: true }, // 1 - 0 
    felipes: {type: Number, required: true }, 
    discipulos : {type: Number, required: true },
    amigosA : {type: Number, required: true },
    niñosA : {type: Number, required: true },
    reconciliados : {type: Number, required: true },
    nuevos : {type: Number, required: true },        
    adultos: {type: Number, required: true },
    niñosC: {type: Number, required: true },        
    hermanos : {type: Number, required: true },
    amigosAD : {type: Number, required: true },
    niñosAD: {type: Number, required: true },        
    diezmo : {type: Number, required: true },
    ofrenda: {type: Number, required: true },        
    otros: {type: Number, required: true },
   
})

export default mongoose.model('Informe', informeSchema)