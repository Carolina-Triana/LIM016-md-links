import fs from "fs";
import path from "path";
import fetch from "node-fetch";
let ruta = "../LIM016-md-links";
let ext = ".md";

//funcion para resolver si la ruta es absoluta o relativa
const rute = (route) => {
    if (path.isAbsolute(route)) {
          return route;
  } else {
    return path.resolve(route);
  }
};
console.log("RUTA ABSOLUTA", rute(ruta));

const itsDirectory = (filePath) => {
  let directoryPromise = new Promise((resolve, reject) => {
    fs.lstat(filePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats.isDirectory());
    });
  });
  return directoryPromise;
};
itsDirectory(rute(ruta)).then((isDirectory) => {
  if (isDirectory) {
    console.log("DIRECTORIO INGRESADO", isDirectory);
  } else {
    console.log("NO DIRECTORIO", isDirectory);
  }
});

const itsFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats.isFile());
    });
  });
};
itsFile(rute(ruta)).then((isFile) => {
  if (isFile) {
    console.log("LA RUTA INGRESADA ES UN ARCHIVO", isFile);
  } else {
    console.log("NO ES UN ARCHIVO");
  }
});

//Leer directorio y filtrar por md
const readDirectory = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(
        files
          .filter(function (md) {
            return path.extname(md) === ext;
          })
          .map((md) => path.join(filePath, md))
      );
    });
  });
};
// funcion para filtrar por links
const linksRegex = (path) => {
  return new Promise((resolve, reject) => {
    let arrLinks = []
    const regexMdLinks = /\[([^\[]+)\](\(http.*\))/gm;
    const matches = path.match(regexMdLinks);
       const results = matches.map((data) => {
      const regexHref = /(\(http.*\))/gm;
      const regexText = /\[([^\[]+)\]/;
      const href = data
        .match(regexHref)
       .join()
        .replace("(", "")
        .replace(")", "");
      const text = data.match(regexText).join();
      return {
        text: text,
        href: href,
        file: 'preguntar como poner los links'
      };
      });resolve(results);
      
      return Promise.all(arrLinks);
    }
  )};
  
//Leer un solo archivo md y devolver links
const readFile = (filePath) => {
  let arrLinks = [];
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "UTF-8" }, function (err, data) {
          if (err) {
        reject(err);
      } else {
        linksRegex(data).then((data)=> {
          //console.log('regex', data)
          resolve(data);
        });
         
      }
    });
    return Promise.all(arrLinks);
  }) ; 
}


//leer archivos varios  y devolver links
const readMdFiles = (arrayMd) => {
  // arrayMd es un arreglo de rutas
  let objLinks = arrayMd.map((res) => {
    // Para cada ruta se devuelve una promesa
    return new Promise((resolve, reject) => {
      // Dentro de la promesa se lee cada archivo
      fs.readFile(res, { encoding: "UTF-8" }, function (err, data) {
        // Si hay error rechaza la promesa
        if (err) {
          reject(err);
        } else {
          linksRegex(data).then((data)=> {
              //console.log('regex', data)
            resolve(data);
          });
          }
        })
      });
    });return Promise.all(objLinks);
  };

// funcion verificar status de links

const statusOfLinks = (links) => {
  return new Promise((resolve, reject) => {
    let arrLinks = [];
    for (let i = 0; i < links.length; i++) {
      arrLinks.push(
        fetch(links[i].href)
          .then((res) => {
              return {
              text: links[i].text,
              href: links[i].href,
              status: res.status,
              file: links[i].file,
              message: links[i].message = (res.status >= 200) && (res.status <= 399) ? 'OK' : 'FAIL'
            };
          })
          .catch((error) => {
            return {
              text: links[i].text,
              href: links[i].href,
              file: links[i].file,
              status: 'Error' + error,
              message: 'FAIL'
            };
      })
      )}
    resolve(arrLinks)
  });
};

export {
  rute,
  itsDirectory,
  itsFile,
  readDirectory,
  readFile,
  readMdFiles,
  statusOfLinks,
};

