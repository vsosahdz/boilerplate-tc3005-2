import dynamodb from 'dynamodb';
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY,AWS_SESSION_TOKEN } from '../config';

//Configuración del SDK en nodejs para conectar con dynamo
dynamodb.AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    //unicamente es necesario si trabajan con el lab learner
    sessionToken: AWS_SESSION_TOKEN,
    region:AWS_REGION
});

export default dynamodb;