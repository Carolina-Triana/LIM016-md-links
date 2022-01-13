import fs from 'fs';
import path from "path";
import fetch from "node-fetch";
let ruta = './';
let ext = ".md";
let cont = [];

//funcion para resolver si la ruta es absoluta o relativa
const rute = (route) => {
    if(path.isAbsolute(route)) {
      return ruta
    }else{
    return path.resolve(route);
    
    }
  }
  console.log('holis',rute(ruta))


const itsDirectory = (filePath) => {
	let directoryPromise = new Promise ((resolve, reject)=> {
		fs.lstat(filePath, (err, stats)=> {
			if (err) {
				reject(err)
				return 
			}
			resolve (stats.isDirectory())
			//crear una funcion para recorrer las carpetas dentro del directorio 
			//crear un else si es un archivo que debe pasar 
		})
	})
	return directoryPromise
};
itsDirectory(rute(ruta))
	.then((isDirectory)=> {
		if (isDirectory) {
			console.log("ok")
		} else {
			console.log("not ok")
		}
	})


const itsFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.lstat(filePath, (err, stats) =>{
			if (err) {
				reject(err);
				return
			}
			resolve(stats.isFile());
		})
	})
};
itsFile(rute(ruta))
	.then((isFile) => {
		if (isFile) {
			console.log("it is")
		} else {
			console.log("its not")
		}
	})

//unir esta funcion con si es un directorio que pase esto
//Leer directorio y filtrar por md
const readDirectory = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readdir(filePath, (err, files) => {
			if (err) {
				reject(err);
				return
			}
		 resolve(
          files.filter(function(md) { 
               return path.extname(md) === ext
	        })
			.map(md=> path.join(filePath, md))
		 )	
	})
})
}
/*
//Leer un solo archivo md y devolver links
const readFile = (filePath) => {
	return new Promise ((resolve, reject) => {
		let arrPromise = []
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return
			}else{
			const regexMdLinks =  /\[([^\[]+)\](\(http.*\))/gm;
              const matches = data.match(regexMdLinks);		
			  matches.map((data) => {
				const regexHref =  /(\(http.*\))/gm;
				const regexText =/\[([^\[]+)\]/;
				const href = data.match(regexHref).join()
				const text = data.match(regexText).join()
			     arrPromise.push({	
					  "text" : text,
					  "href": href,
					  "file" : filePath
				  });
					})
			  console.log('prueba', arrPromise)	  
			  return arrPromise
				}
				})
            resolve(matches)
			}
            
		)
	}
readFile(rute(ruta))
	.then((data) => {
		console.log('que es esto',data)
	})
*/
    //leer archivos varios  y devolver links
    const readMdFiles  = (arrayMd) =>{
        return new Promise((resolve, reject) =>{
            let arrPromise = [];
        for (let i = 0; i <arrayMd.length; i++) {
          fs.readFile(arrayMd[i], { encoding: "UTF-8" }, function (err, data) {
            if (err) {
              console.log(err,'no puedo leer');
            } else {
              console.log("datos leidos");
			  const regexMdLinks =  /\[([^\[]+)\](\(http.*\))/gm;
			  const matches = data.match(regexMdLinks)
			 matches.map((data) => {
			  const regexHref =  /(\(http.*\))/gm;
			  const regexText =/\[([^\[]+)\]/;
              const href = data.match(regexHref).join().replace("(", "").replace(")", "")
			  const text = data.match(regexText).join()
			 arrPromise.push({	
					"text" : text,
					"href": href,
					"file" : arrayMd[i]
				});
         	 	})
			//console.log('prueba', arrPromise)	  
			return arrPromise
			 
			}			  
            })
            resolve (arrPromise)
        
      }
    })
};
readDirectory(rute(ruta))
	.then((readDirectory) => {
		if (readDirectory) {
			console.log("ok directory", readDirectory)
			readMdFiles(readDirectory)
		} else {
			console.log("not ok directory")
		}
	})


// funcion verificar status de links

const statusOfLinks = (links) => {
	return new Promise((resolve, reject) =>{
		let arrLinks = [];
		for (let i = 0; i < links.length; i++){
	 	arrLinks.push(fetch(links[i].href).then( res =>{
			 //console.log('res link',res)
			return{
				"text" : links[i].text, 
				"href" : links[i].href, 
				"status" : res.status,
				"file" : links[i].file
			}
			}))
		}
		resolve (Promise.all(arrLinks))
	})
};

statusOfLinks([{
    text: '[Node.js],Node.js',
    href: 'https://nodejs.org/',
    file: 'C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links1.md'
  },
  {
    text: '[md-links],md-links',
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    file: 'C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links2.md'
  }])
.then((links) =>{
console.log('funciona?', links)
})

/*Promise.all([readDirectory(rute()), readFile(rute()), itsMdFile(rute()), readMdFiles(rute())])
.then ((res) => {
    console.log(res)
});*/
/*
const readData = (arrayMd) =>{
    for (let i = 0;  i <arrayMd.length; i++) {
      fs.readFile(arrayMd[i], { encoding: "UTF-8" }, function (err, data) {
        if (err) {
          console.log(err,'no puedo leer');
        } else{
          console.log("datos leidos");
          let content = data;
          const regexMdLinks =  /\[([^\[]+)\](\(http.*\))/gm;
          const matches = content.match(regexMdLinks);
          cont.push(matches);
		  console.log(cont)
           return cont
        }
      });
    }}
	readDirectory(rute(ruta))
	.then((readDirectory) => {
		if (readDirectory) {
			console.log("ok directory", readDirectory)
			readData(readDirectory)
		} else {
			console.log("not ok directory")
		}
	})
*/

