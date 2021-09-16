import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';
// import grupoBiblico from '..routes/grupoBiblico.js';
import usuario from '../routes/usuario.js'
import iglesia from '../routes/iglesia.js'
import fileUpload from 'express-fileupload'




class Server {
    constructor(){
        this.port=process.env.PORT;
        this.app = express();
        this.middlewares();
        this.connectionDb();
        this.routes();
    }

    routes(){
        // this.app.use('/api/grupobiblico',   grupoBiblico)
        this.app.use('/api/usuario',usuario)
        this.app.use('/api/iglesia',iglesia)
    }

    async connectionDb(){
       await dbConnection();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static(`public`));

        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParenthPath:true
        }));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`); 
        });
    }
}

export default Server




