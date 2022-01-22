import { mdLinks } from "./mdLinks.js";

let path = process.argv[2]
let option = process.argv[3];
let option2 = process.argv[4];
mdLinks(path, option , option2)
.then((res)=>console.log(res))
.catch((res)=>console.log('ingrese una ruta para comenzar'))

