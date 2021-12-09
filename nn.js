let fs = require('fs');
let path = require('path');

fs.readdir('./', {encoding: 'UTF-8'}, function(err, data){ //leer lista de archivos de la carpeta actual
    if(err){
      console.log(`Su carpeta no contiene ningun archivo ${err}`);
    }else{
      console.log('Lista de datos');
     let list = data
     console.log(list); //imprime la lista de archivos
    let ext = '.md';
    let extFilter = list.filter(function(file) { // filtrar archivos md de la lista
        return path.extname(file) === ext });
     console.log(extFilter);//imprime los archivos .md
    let a= extFilter.map(function(x) { // funcion que imprime la ruta de los archivos de todos md
     let b = (__dirname)+'/'+ x; 
     console.log(b)
    })
    for (let i = 0; i < extFilter.length; i++) {
    fs.readFile(extFilter[i], {encoding: 'UTF-8'}, function(err, data){
        if(err){
          console.log('error 123');
        }else{
          console.log('datos leidos');
          let a = data
          
          console.log(a);
        }
      })}
    }
  });