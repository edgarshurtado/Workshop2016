function suma(a, b){
    return parseInt(a, 10) + parseInt(b, 10);
}

function resta(a, b){
    return parseInt(a, 10) - parseInt(b, 10);
}

function mult(a, b){
    return parseInt(a, 10) * parseInt(b, 10);
}

function div(a, b){
    return parseInt(a, 10) / parseInt(b, 10);
}

module.exports = {
    suma: suma,
    resta: resta,
    mult: mult,
    div: div
}