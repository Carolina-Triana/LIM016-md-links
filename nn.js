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
        return path.extname(file) === ext
      });
     console.log('archivos md',extFilter);//imprime los archivos .md
    let filterMd= extFilter.map(function(x) { // funcion que imprime la ruta de los archivos de todos md
     let rutaMd = (__dirname)+'/'+ x; 
     console.log(rutaMd)
    })
    for (let i = 0; i < extFilter.length; i++) {
    fs.readFile(extFilter[i], {encoding: 'UTF-8'}, function(err, data){
        if(err){
          console.log('error 123');
        }else{
          console.log('datos leidos');
          let dataMd = data
          
          console.log(dataMd);
        }
      })}
    }
  });

  // funcion transforma los archivos md en rutas  no es necesaria
/*const routeMd = () =>
  extFilter.map(function (x) {   
    rutaMd = __dirname + "/" + x;
     console.log('ruta', rutaMd);
  });*/
  // funcion para leer lista de archivos de una carpeta

/*const readDirectory = () =>
  fs.readdir(ruta, { encoding: "UTF-8" }, function (err, data) {
    if (err) {
      console.log(`su carpeta no contiene archivos md ${err}`);
    } else {
      console.log("Lista de datos");
     let list = data;
      console.log(data); //imprime la lista de archivos
     extFilter(list);
       // routeMd(); // funcion transforma los archivos md en rutas
     for (let i = 0; i < extFilter.length; i++) {
  fs.readFile(extFilter[i], { encoding: "UTF-8" }, function (err, data) {
    if (err) {
      console.log("error 123");
    } else {
      console.log("datos leidos");
      let dataMd = data;

      console.log(dataMd);
    }
  });
}
     
    }
  });
readDirectory(); */

//funcion para leer directorio y archivos md
/*const readDirectory = () =>fs.readdir(ruta, {encoding: 'UTF-8'}, function(err, data){
  if(err){
    console.log(`Su carpeta no contiene ningun archivo ${err}`);
    return err
  }else{
    console.log('Lista de datos');
   return list.push(data)
  }
});
 readDirectory();*/