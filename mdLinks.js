import {
  rute,
  itsDirectory,
  readDirectory,
  readFile,
  readMdFiles,
  statusOfLinks,
} from "./index.js";

///////////////// CLI ///////////////////
const countLinks = (arrLink, option) => {
  let broken = 0
	arrLink.forEach((hrefLink)=>{
  if(hrefLink.message == 'OK') {
      	return broken = broken + 1;
		}else{
      const links = arrLink.map((item) => item.href); //revisar
      console.table({ 'LINKS':links.length, 'BROKEN': broken})
      
    }
  })
}
    
const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    let userPath = rute(path);
    let arrLinks = [];
    itsDirectory(userPath)
      .then((directory) => {
          if (directory === true) {
            readDirectory(userPath)
              .then((readPath) => {
                return readMdFiles(readPath);
              })
              .then((links) => {
                return statusOfLinks(links.flat()) 
                .then((info) => {
                  Promise.all(info).then((es) => {
                     arrLinks.push(es)
                     //console.log(es)
                     if(option == '--stats'){
                      countLinks(es ,  option)}
                      else if(option == '--validate'){
                        console.table(es)
                      }else{                        
                        console.log('                    ██████████████▄  ▐█▄▄▄▄█▌')
                        console.log('                    ██████▌▄▌▄▐▐▌███  ▀▀██▀▀')                        
                        console.log('                    ████▄█▌▄▌▄▐▐▌▀███▄▄█▌')
                        console.log('                    ▄▄▄▄▄██████████████▀')
                        console.log('              ')
                        console.log('≪────≪  INGRESE UNA OPCION PARA MOSTRAR RESULTADOS  ≫────≫')
                        console.log('      ')
                        console.log('|⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻|')
                        console.log('|  (☛ ✿ ◠ ‿ ◠ )☛  --validate ' , '||  (☛ ✿ ◠ ‿ ◠ )☛   --stats  |')
                        console.log('|₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋|')
                      }
                     return arrLinks
                 })                                
                 }) .catch((err) => {
                    console.log(err)
                  });
              }) ; resolve(arrLinks);
             
          } else  if (directory === false) {
            readFile(userPath)
              .then((readFile) => {
                return statusOfLinks(readFile.flat())
                .then((info) => {
                  Promise.all(info).then((es) => {
                     arrLinks.push(es)
                     if(option == '--stats'){
                      countLinks(es ,  option)}
                      else if(option == '--validate'){
                        console.table(es)
                      }else{
                        console.log('                    ██████████████▄  ▐█▄▄▄▄█▌')
                        console.log('                    ██████▌▄▌▄▐▐▌███  ▀▀██▀▀')                        
                        console.log('                    ████▄█▌▄▌▄▐▐▌▀███▄▄█▌')
                        console.log('                    ▄▄▄▄▄██████████████▀')
                        console.log('              ')
                        console.log('≪────≪  INGRESE UNA OPCION PARA MOSTRAR RESULTADOS  ≫────≫')
                        console.log('      ')
                        console.log('|⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻|')
                        console.log('|  (☛ ✿ ◠ ‿ ◠ )☛  --validate ' , '||  (☛ ✿ ◠ ‿ ◠ )☛   --stats  |')
                        console.log('|₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋|')
                      }
                      return arrLinks
                 })                                
                 }) .catch((err) => {
                    console.log(err)
                  });
              }) 
            resolve(arrLinks);
          }
    })
    .catch((err) => {
        reject(err);
  });
})
}
export { mdLinks }
