var dynamodb = require('dynamodb');
var joi = require('joi');
dynamodb.AWS.config.update({
    accessKeyId: "ASIAWFVAQPIGXSI36B7S",
    secretAccessKey: "MC5d/u3z/s09pNIxKD8pPZJJkgkoOLRK436G1+vR",
    //unicamente es necesario si trabajan con el lab learner
    sessionToken: "FwoGZXIvYXdzEE8aDChZ68vzbrRo+Cn+DCK2Abl7lkl+8hWyJ1VWgPQqIrQjK25nhuglHqBJhZMvRyqdBBGNcnxLoiiZf555N4H9yJMn67YpLeMq4WSB+O39DcYcRa7wjCA4zU7zl8AniO02ZegeCLZ4hBWOZRmRE3A/2J/dT/H3ZHQcIUxpSRSOD5fWbbEqpgY2vY6a6dgoJ+x/JZUGXHaxxTyrOAGXIQJQSSU0xthLwiVyEEh50DKpXIsP8YEVYb9+TZ9GQOhtb300UhY+IvXFKKupsZMGMi3eA7R2bDXl9RXiXsT5j5XdPBsMbd5JusExbQBNyrD3UKpqgoRUG/wkJ68PbRo=",
    region: "us-east-1"
});
var Alumno = dynamodb.define('user', {
    hashKey: 'matricula',
    timestamps: true,
    schema: {
        matricula: dynamodb.types.uuid(),
        nombre: joi.string(),
        edad: joi.number()
    },
    tableName: 'AlumnoT'
});
dynamodb.createTables(function (err) {
    if (err)
        return console.log('Error creando la table', err);
    console.log("La tabla fue creada exitosamente");
});
