//const express = require("express");
import express, {Request, Response,NextFunction} from 'express';

class Server{
    private app:express.Application;
    private port:number;
    private env:string;

    constructor(appInit:{port:number;middlewares:any;controllers:any;env:string}){
        this.app = express();
        this.port = appInit.port;
        this.env = appInit.env;
    }

    public init():void{
        this.app.listen(this.port,()=>{
            console.log(`Server running @'http://localhost:${this.port}'`);
        })
    }
}

export default Server;