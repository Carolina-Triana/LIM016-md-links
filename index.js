import fs from "fs";
import path from "path";
import fetch from "node-fetch";
let ruta = "./";
let ext = ".md";
let cont = [];

//funcion para resolver si la ruta es absoluta o relativa
const rute = (route) => {
  if (path.isAbsolute(route)) {
    return ruta;
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
      //crear una funcion para recorrer las carpetas dentro del directorio
      //crear un else si es un archivo que debe pasar
    });
  });
  return directoryPromise;
};
itsDirectory(rute(ruta)).then((isDirectory) => {
  if (isDirectory) {
    console.log("DIRECTORIO INGRESADO");
  } else {
    console.log("NO DIRECTORIO");
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
    console.log("ARCHIVO INGRESADO");
  } else {
    console.log("NO ES UN ARCHIVO");
  }
});

//unir esta funcion con si es un directorio que pase esto
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

//Leer un solo archivo md y devolver links
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    let arrPromise = [];
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        const regexMdLinks = /\[([^\[]+)\](\(http.*\))/gm;
        const matches = data.match(regexMdLinks);
        matches.map((data) => {
          const regexHref = /(\(http.*\))/gm;
          const regexText = /\[([^\[]+)\]/;
          const href = data
            .match(regexHref)
            .join()
            .replace("(", "")
            .replace(")", "");
          const text = data.match(regexText).join();
          arrPromise.push({
            text: text,
            href: href,
            file: filePath,
          });
        });
        console.log("prueba", arrPromise);
        return arrPromise;
      }
    });
    resolve(matches);
  });
};
/*
readFile(rute(ruta))
	.then((data) => {
		console.log('que es esto',data)
	})
*/
//leer archivos varios  y devolver links
const readMdFiles = (arrayMd) => {
   return new Promise((resolve, reject) => {
     let objLinks = []
  let arrPromise = arrayMd.map((res) => {   
      fs.readFile(res, { encoding: "UTF-8" }, function (err, data) {
        if (err) {
          reject(err);
        } else {
          console.log("datos leidos");
          const regexMdLinks = /\[([^\[]+)\](\(http.*\))/gm;
          const matches = data.match(regexMdLinks);
          objLinks.push(
           matches.map((data) => {
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
              file: res,
            } 
          })
         ); 
        }
      });  
    });resolve(Promise.all((arrPromise)))
  })
};

readMdFiles([
  "C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links1.md",
  "C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links2.md",
  "C:\\Users\\CLARA\\Documents\\LIM016-md-links\\README.md",
]).then((links) => {
  console.log("funciona?", links);
}).catch((err) => {
console.log('error', err)
})

readDirectory(rute(ruta)).then((readDirectory) => {
  if (readDirectory) {
    console.log("ok directory", readDirectory);
    return readDirectory;
  }/*
  if (readDirectory) {
    readMdFiles(readDirectory).then((readLinks) => {
      console.log(readLinks);
    });
  } */else {
    console.log("not ok directory");
  }
});

// funcion verificar status de links
/*
const statusOfLinks = (links) => {
  return new Promise((resolve, reject) => {
    let arrLinks = [];
    for (let i = 0; i < links.length; i++) {
      arrLinks.push(
        fetch(links[i].href)
          .then((res) => {
            //console.log('res link',res)
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
    resolve(Promise.all(arrLinks));
  });
};

statusOfLinks().then((links) => {
  console.log("funciona?", links);
});

export {
  rute,
  itsDirectory,
  itsFile,
  readDirectory,
  readFile,
  readMdFiles,
  statusOfLinks,
};
*/
