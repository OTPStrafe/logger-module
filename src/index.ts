import fs from 'fs';
import path from 'path';
import colors from 'colors';

export const logger =  async (message: string, type: 'error' | 'info' | 'warn', logName?: string, dirName?: string, dirPath?: string): Promise<any> => {
  var name: string = logName || '[LOGGER]'; // Nombre del log
  var filePath: string; // Path del archivo/carpeta
  if (!dirPath) filePath = path.join(__dirname, `../../../${dirName || 'logs'}`)
  else filePath = dirPath;
  if (!filePath) return console.log(colors.red('No file path provided'));
  (type === 'error') ? console.log(colors.red(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
  (type === 'info') ? console.log(colors.green(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
  (type === 'warn') ? console.log(colors.yellow(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
  if (!fs.existsSync(filePath)){ 
    // Si no existe crea la carpeta y el archivo con el primer mensaje
    fs.mkdirSync(filePath, { recursive: true });
    fs.writeFileSync(`${filePath}/log.txt`, `${name}: ${message} - ${type}`, { encoding: 'utf8' })
  } else {
    // Si ya existe hace una nueva linea y pega el nuevo texto
    fs.appendFileSync(`${filePath}/log.txt`, `\n${name}: ${message} - ${type}`, { encoding: 'utf8' });
  }
}

logger('MENSAJE', 'info', '[RAGEMP]', 'information', 'D:\\Programacion\\workspace\\npm-test\\logs')