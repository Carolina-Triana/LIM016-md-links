function singleThread(){ // o hilo unico imprime en una sola linea
console.log('-----metodos del modulo process-----')
console.log('metodo que me permite acceder al Id del proceso que node le da dinamicamente ............'+ process.pid)
console.log('con este metodo accedo al titulo ..............' + process.title)
console.log(' me dice donde esta el directorio de node.................. '+ process.execPath)
console.log(' accedo al directorio actual donde estoy path...............' + process.cwd())
console.log(' version de node........... '+process.version)
console.log('versiones Dependencias npm.........' + process.versions)
console.log('sistema operativo donde estoy .........' + process.platform)
console.log(' arquitectura del sistema operativo .........' + process.arch)
console.log('tiempo activo de node o lo que tardo el proceso .........' + process.uptime())
console.log(' argumentos del proceso argv es un arreglo que tiene dos parametros, [ruta donde se esta ejecutando] [archivo que se esta ejecutanto] .........' + process.argv)

}
singleThread()

//modulo de http clase que me permite levantar un servidor web

const mdLinks = require('./mdLinks.js'); 

const fs = require('fs');
const path = require('path');
let pathC = process.argv[2];
pathC = path.normalize(path.resolve(pathC));

// Función que muestra archivos que se encuentran dentro del directorio.

const readDir = (__dirname => {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, subdirs) => {
      if (err) {
        reject(console.log(err, "El directorio esta vacío"))
      }
      resolve(subdirs);

      subdirs.forEach(file => {
        if (path.extname(file) === ".md") {
          console.log("Archivos Markdown: ", file)
          readFiles()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log("Este no es un archivo Markdown, ingresa un archivo con extensión .md");
            })

        }
      })

    })
  })
});

a.find((f) => f === 'importante');
filter(fn => fn.endsWith('.md'));

/* files.filter(function(md) { 
               return path.extname(md) === ext
               resolve(files.forEach(md => {
              if (path.extname(md) === ext){
                console.log('prueba', md)
                return a 
               */