import {
  rute,
  itsDirectory,
  readDirectory,
  readFile,
  readMdFiles,
  statusOfLinks
  } from '../index.js';

  import path from "path";
  
describe('rute()', () => {

  it('debe retornar una ruta absoluta', () => {
    expect(rute('./links1.md')).toBe(path.resolve('./links1.md'))
  });

});

test('itsDirectory(), debe retornar true para un directorio', () => {
  return itsDirectory('../LIM016-MD-LINKS').then(data => {
    expect(data).toBe(true);
  });
});

describe('readDirectoy()', () => {
  it('debe array de rutas', () => {
  return readDirectory('../LIM016-MD-LINKS').then(data => {
    expect(typeof data).toBe('object');
  });
})
});


describe('readFile()', () => {
  it('debe array de links', () => {
  return readFile('./links1.md').then(data => {
    expect(typeof data).toBe('object');
  });
})
});


describe('readMdFiles()', () => {
  it('debe array de objetos', () => {
  return readMdFiles([
    "C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links1.md",
    "C:\\Users\\CLARA\\Documents\\LIM016-md-links\\links2.md",
  ]).then(data => {
    expect(typeof data).toBe('object');
  });
})
});



