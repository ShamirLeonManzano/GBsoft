import Publicacion from "../models/publicacion.js";

const existePublicacionById = async (id) =>{
    const existe = await Publicacion.findById(id);
    if(!existe) throw new Error('El ID no existe')
}

export {existePublicacionById}