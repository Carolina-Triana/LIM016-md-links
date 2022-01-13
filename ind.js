/*module.exports = () => {
  console.log('Welcome to the outside!')
}*/

let fs = require("fs");
let path = require("path");
let ruta = process.argv[2];
let ext = ".md";
let cont=[];


//funcion para verificar si la ruta es absoluta o relativa
const rute = () => {
  if(path.isAbsolute(ruta)) {
    return ruta
  }else{
  path.normalize(path.resolve(ruta));
  return ruta
  }
}
console.log('holis',rute())

// funcion para verificar si la ruta existe
function existPath() {
  try {
    validRut = fs.accessSync(rute(), fs.constants.F_OK);
    console.log("ruta existe");
  } catch (err) {
    console.error(`la ruta ingresada no existe ${err}`);
  }
}
existPath();

//leer un archivo
const readFile =() => fs.readFileSync(rute() , {encoding: 'UTF-8'});
// leer una ruta
const readSync =() =>fs.readdirSync(rute(), {encoding: 'UTF-8'});
// funcion para validar si es archivo
/*
const isArchive = () => fs.stat(rute(), {encoding: 'UTF-8'}, function(err,) {
if(err == null){
  console.log('es una ruta', err)
 console.log('ruta', readFile());
}else{
console.log('es un archivo', err , readSync())
}})

isArchive()

/*const isArchive = (ruta) => fs.statSync(ruta).isFile();
console.log("¿la ruta es un arcivo?");
console.log('archivos', isArchive(rute()));*/
//funcion para leer los archivos

//console.log('Lista de archivos',readSync());


// filtrar archivos md de la lista de archivos
const extFilter = (data) => data.filter(function(x) { 
    return path.extname(x) === ext
 });
console.log('aaaa' , extFilter(readSync()));

// funcion que lee los archivos md de  un directorio
const readData = (arrayMd) =>{
  for (let i = 0; i <arrayMd.length; i++) {
    fs.readFile(arrayMd[i], { encoding: "UTF-8" }, function (err, data) {
      if (err) {
        console.log(err,'no puedo leer');
      } else {
        console.log("datos leidos");
        let content = data;
         const regexMdLinks =  /\[([^\[]+)\](\(http.*\))/gm;
        const matches = content.match(regexMdLinks);
        cont.push(matches);
        console.log(cont)
         return cont
      }
    });
  }
}
readData(extFilter(readSync()));
 



// funcion que lee un solo archivo

/*const readFile =() => fs.readFileSync(ruta , {encoding: 'UTF-8'});
console.log('archivo', readFile());*/

/*JSON.stringify()*/
