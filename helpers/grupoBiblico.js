import GrupoBiblico from "../models/grupoBiblico.js";
import Red from '../models/red.js'
import SubRed from '../models/subRed.js' 
import Usuario from "../models/usuario.js";

const existeGrupoByCod = async (codigo) => {
    const existe = await GrupoBiblico.findOne({codigo})
    if(existe) throw new Error('Ya existe un Grupo con este código')

}

const existeGrupoByGbId = async (id) => {    
    const existe = await GrupoBiblico.findById(id)   
    if(!existe) throw new Error('El ID de Gb no existe')
}

const existeRedById = async (red) =>{
    const existe = await Red.findById(red)
    if(!existe){
        throw new Error (`El ID no existe`)
    }
}
const existeSubRedById = async (subRed) =>{    
    const existe = await SubRed.findById(subRed)
    if(!existe){
        throw new Error (`El ID no existe`)
    }
}

const existeFelipeGById = async (felipeG) =>{    
    const existe = await Usuario.findById(felipeG)
    if(!existe){
        throw new Error (`El ID no existe`)
    }
}
export {existeGrupoByCod, existeGrupoByGbId, existeRedById,existeSubRedById, existeFelipeGById }