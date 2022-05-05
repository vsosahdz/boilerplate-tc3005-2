import AWS from 'aws-sdk';
import crypto from 'crypto';
import { COGNITO_APP_CLIENT_ID, COGNITO_APP_SECRET_HASH, AWS_REGION } from '../config';

type CognitoAttributes = 'email' | 'name' ;

class CognitoService {
	// Conectarse a Cognito
	private config: AWS.CognitoIdentityServiceProvider.ClientConfiguration;
	private cognitoIdentity: AWS.CognitoIdentityServiceProvider;

	// Conectar la aplicación a cognito
	private clientId = COGNITO_APP_CLIENT_ID;
	private secretHash = COGNITO_APP_SECRET_HASH;

    //Singleton
	private static instance: CognitoService;
	public static getInstance(): CognitoService {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new CognitoService();
		return this.instance;
	}

	private constructor() {
		this.config = {
			region: AWS_REGION,
		};
		this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
	}

    //Metodo de registro
	public async signUpUser(email: string, password: string, userAttr: { Name: CognitoAttributes; Value: string }[]) {
		const params = {
			ClientId: this.clientId /* required */,
			Password: password /* required */,
			Username: email /* required */,
			SecretHash: this.hashSecret(email) /* required */,
			UserAttributes: userAttr,
		};

		return await this.cognitoIdentity.signUp(params).promise();
	}

    
    //Update name or email
    //Verificar cuentas
    //Signing in (Autenticarse)
    //Actualizar token
    //Cambiar password 
    //Recuperar password
    //Confirmacion de password
    //Obtener informacion del usuario
    //Obtener correo electronico 
    //Eliminar cuenta
    
    //Cifrar la información
    private hashSecret(username: string): string {
		return crypto
			.createHmac('SHA256', this.secretHash)
			.update(username + this.clientId)
			.digest('base64');
	}
}

export default CognitoService;