import Directorio from "../models/perDirectorio.js";
import GrupoBiblico from "../models/grupoBiblico.js"


const existeDirectorioById = async (id) => {    
    const existe = await Directorio.findById(id)    
    if(!existe) throw new Error('El ID no existe')
}

const existeDirectorioByGbId = async (id) => {
    const existe = await GrupoBiblico.findById(id)   
    if(!existe) throw new Error('El ID de Gb no existe')
}

const existePersonaByNombre = async (nombre)=>{
    const existe = await Directorio.findOne({nombre})
    if (existe) throw new Error ('Ya existe una Persona con ese nombre')
}

export {existeDirectorioById, existeDirectorioByGbId, existePersonaByNombre}
