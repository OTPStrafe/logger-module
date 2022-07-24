"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const logger = (message, type, logName, dirName, dirPath) => __awaiter(void 0, void 0, void 0, function* () {
    var name = logName || '[LOGGER]'; // Nombre del log
    var filePath; // Path del archivo/carpeta
    if (!dirPath)
        filePath = path_1.default.join(__dirname, `../${dirName || 'logs'}`);
    else
        filePath = dirPath;
    if (!filePath)
        return console.log(colors_1.default.red('No file path provided'));
    (type === 'error') ? console.log(colors_1.default.red(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
    (type === 'info') ? console.log(colors_1.default.green(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
    (type === 'warn') ? console.log(colors_1.default.yellow(`${name}: ${message} - ${type}`.toUpperCase())) : undefined;
    if (!fs_1.default.existsSync(filePath)) {
        // Si no existe crea la carpeta y el archivo con el primer mensaje
        fs_1.default.mkdirSync(filePath, { recursive: true });
        fs_1.default.writeFileSync(`${filePath}/log.txt`, `${name}: ${message} - ${type}`, { encoding: 'utf8' });
    }
    else {
        // Si ya existe hace una nueva linea y pega el nuevo texto
        fs_1.default.appendFileSync(`${filePath}/log.txt`, `\n${name}: ${message} - ${type}`, { encoding: 'utf8' });
    }
});
exports.logger = logger;
