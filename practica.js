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
console.log(' argumentos del proceso argv es un arreglo que tiene dos parametros, [ruta donde se esta ejecutando] [archivo que se esta ejecutanto] .........' + process.argv[2])

}
singleThread()
