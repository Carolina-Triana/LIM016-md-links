import {
  rute,
  itsDirectory,
  readDirectory,
  readFile,
  readMdFiles,
  statusOfLinks,
} from "./index.js";

//let pathUser = proces.argv[2]

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    let userPath = rute(path);
    console.log("aa", userPath);

    
    let arrLinks = [];

    itsDirectory(userPath)
      .then((directory) => {
          if (directory === true) {
            readDirectory(userPath)
              .then((readPath) => {
                console.log("readDirectory", readPath);
                return readMdFiles(readPath);
              })
              .then((links) => {
                console.log("readMdFiles", links.flat()); // me retorna el array de objetos con los links
                return statusOfLinks(links.flat()) // ingreso ese array para validar los links
                .then((info) => {
                  Promise.all(info).then((es) => {
                     //arrLinks.push(es)
                     console.log('asasas',es)
                     return arrLinks.push(es)
                    // resolve(arrLinks.push(es));
                 })                                
                 }) .catch((err) => {
                    console.log(err)
                  });
              }) ; resolve(arrLinks);
             
          } else  if (itsDirectory === false) {
            readFile(userPath)
              .then((readFile) => {
                console.log('read file',readFile)
                return readMdFiles(readFile);
              })
              .then((links) => {
                console.log("linksD", links);
                return statusOfLinks(links);
              })
              .then((info) => {
            
                  arrLinks.push(info);
                
              });
            resolve(arrLinks);
          }
    })
    .catch((err) => {
        reject("Ingrese una ruta valida", err);
  });
})
}

/*mdLinks('../LIM016-md-links').then((res)=>{
  console.log('sera que funciona?', res)
})*/

///////////////// CLI ///////////////////

///// --validate

const validate = (option) => {
  return new Promise((resolve, reject) => {
    mdLinks(arg[0], { validate: true }).then((res) => {
      res.forEach((elem) => {
        const href = elem.href;
        const file = elem.file;
        const http = elem.status;
        const text = elem.text;
      });
    });
  });
};

export { mdLinks };
