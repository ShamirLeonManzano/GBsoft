import SubRed from '../models/subRed.js'
import Red from '../models/red.js'

const existeSubRedByCodigo = async (codigo) => {
    const existe = SubRed.findOne({codigo})
    
    if(existe) throw new Error('Ya existe Sub Red con ese código')
}

const existeSubRedById = async (id ) =>{
    const existe = await SubRed.findById(id)

    if(!existe){
        throw new Error (`El ID no existe`)
    }
}

const existeSubRedByRedId = async (id) => {
    const existe = await Red.findById(id)   
    if(!existe) throw new Error('El ID de Red no existe')
}

export {existeSubRedByCodigo, existeSubRedById, existeSubRedByRedId}