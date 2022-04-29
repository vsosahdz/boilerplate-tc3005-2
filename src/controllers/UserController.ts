import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import GrupoModel from "../modelsNOSQL/grupoNOSQL";


class UserController extends AbstractController{
    //Singleton
    private static instance:UserController;
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new UserController("user");
        return this.instance;
    }

    //Declaración de las rutas del controlador
    protected initRoutes(): void {
       this.router.get('/readUser',this.getReadUser.bind(this));
       this.router.get('/readUsers',this.getReadUsers.bind(this));
       this.router.post('/createGrupo',this.postCreateGrupo.bind(this));

       //Agregar más rutas
    }
    private async postCreateGrupo(req:Request,res:Response){
        try{
            console.log(req.body);
            await GrupoModel.create(req.body);
            console.log("Registro existos");
            res.status(200).send("Registro existoso");
        }catch(err:any){
            console.log(err);
            res.status(500).send("Error fatal");
        }
    }

    private async getReadUser(req:Request,res:Response){
        try{
            res.status(200).send({data:"User"});
        }catch(error){
            if(error instanceof Error){
                res.status(500).send({message:error.message});
            }else{
                res.status(501).send({message:"Error externo"})
            }
        }
    }

    private async getReadUsers(req:Request,res:Response){

    }
    
}

export default UserController;