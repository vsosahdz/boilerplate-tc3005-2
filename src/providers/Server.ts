//const express = require("express");
import express, {Request, Response,NextFunction} from 'express';
import AbstractController from '../controllers/AbstractController';

class Server{
    private app:express.Application;
    private port:number;
    private env:string;

    constructor(appInit:{port:number;middlewares:any[];controllers:AbstractController[];env:string}){
        this.app = express();
        this.port = appInit.port;
        this.env = appInit.env;
        this.loadMiddlewares(appInit.middlewares);
        this.loadRoutes(appInit.controllers);
    }

    private loadRoutes(controllers:AbstractController[]):void{
        //Pagina de prueba
        this.app.get('/',(_:any,res:Response)=>{
            res.status(200).send({
                message:"The backend is working",
                documentation:"https://github.com/"
            })
        });
        //Agregar controladores
        controllers.forEach((controller:AbstractController)=>{
            this.app.use(`/${controller.prefix}`,controller.router);
        })
    }

    //Agregar Middlewares
    private loadMiddlewares(middlewares:any[]):void{
        middlewares.forEach((middleware:any)=>{
            this.app.use(middleware)
        })
    }

    public init():void{
        this.app.listen(this.port,()=>{
            console.log(`Server running @'http://localhost:${this.port}'`);
        })
    }
}

export default Server;