import GrupoBiblico from "../models/grupoBiblico";

const existeGrupoByCod = async (codigo) => {
    const existe = await GrupoBiblico.findOne({codigo})
    if(!existe) throw new Error('Ya existe un grupo con ese código')

}

export {existeGrupoByCod}