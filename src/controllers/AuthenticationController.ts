import {Request,Response} from 'express';
import AbstractController from './AbstractController';


//Modelos 
//Usuario
//Configurar el servicio de correo electronico


class AuthenticationController extends AbstractController{
    //Singleton
    private static instance:AuthenticationController;
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new AuthenticationController("auth");
        return this.instance;
    }
    protected initRoutes(): void {
        this.router.post('/signup',);
    }

    private async postSignUp(req:Request,res:Response){
        const { email, password, name, role} = req.body;

		try {
			// Create Cognito User
			const user = await this.cognitoService.signUpUser(email, password, [
				{
					Name: 'email',
					Value: email,
				},
				{
					Name: 'name',
					Value: name,
				}				
			]);
			console.log('cognito user created', user);		
            
			res.status(201).end();
		} catch (error:any) {
			//console.log('failed auth controller', error);
			res.status(500).send({ code: error.code, message: error.message });
		}
    }

}