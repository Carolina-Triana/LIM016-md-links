import {
    rute,
    itsDirectory,
    itsFile,
    readDirectory,
    readFile,
    readMdFiles,
    statusOfLinks
    } from './index.js';

 const mdLinks = (path) =>{
return new Promise ((resolve, reject) =>{
   let userPath = rute(path)
  if (itsDirectory(userPath) === true /*&& option.validate === true*/) {   
    readDirectory(userPath).then((readPath) =>{
    readMdFiles(readPath).then((links)=>{
        statusOfLinks(links)
    })
    }); return mdLinks
  }
  if (itsFile(userPath) === true){      
      readFile(userPath).then((readFile) =>{
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

 };

mdLinks('C:/Users/CLARA/Documents/LIM016-md-links').then((res)=>{
  console.log('sera que funciona?', res)
})