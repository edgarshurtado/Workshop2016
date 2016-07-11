var http =require("http");
var url = require("url");
var operaciones = require("./operaciones.js");

var server = http.createServer(function(peticion, respuesta){
    // Pick the pathroute without the '/' simbol
    var pathname = url.parse(peticion.url, true).pathname.slice(1);
    var num1 = url.parse(peticion.url, true).query.numero1;
    var num2 = url.parse(peticion.url, true).query.numero2;

    respuesta.writeHead(200, {'Content-type': 'text/html; charset=utf8'});

    var opResult = executeOperation(pathname, num1, num2);

    respuesta.end("El resultado de la operación " + pathname + " es de " + opResult);
});

server.listen(3000, function(){
    console.log("tu servidor está listo en" + this.address().port);
});

function executeOperation(functionName, num1, num2){
    var result;
    /**
     * Check if the functionName exists and if so, executes that function passing the 2 numbers
     */
    if(operaciones[functionName]){
        result = operaciones[functionName](num1, num2);
    }
    return result
}