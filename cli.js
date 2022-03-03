import { mdLinks } from "./mdLinks.js";

let path = process.argv[2]
let option = process.argv[3];
mdLinks(path, option)
.then((res)=>console.log(res))
.catch((res)=>console.log('ingrese una ruta para comenzar'))

