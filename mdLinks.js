import {
    rute,
    itsDirectory,
    itsFile,
    readDirectory,
    readFile,
    readMdFiles,
    statusOfLinks
    } from './index.js';

 const mdLinks = (path , option) =>{
return new Promise ((resolve, reject) =>{
 if (rute(path)){
     return path}
  if (path) {
    itsDirectory(path) === true
    readDirectory(path).then((readPath) =>{
    readMdFiles(readPath).then((links)=>{
        statusOfLinks(links)
    })
    }); return mdLinks
  }
  if (path){
      itsFile(path) === true
      readFile(path).then((readFile) =>{
          readMdFiles(readFile).then((links) =>{
            statusOfLinks(links)
          })
      }); return mdLinks
  }  
  else{
     console.log('Ingrese una ruta valida')
 }
 resolve (mdLinks(path))

})

 }