import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource implements LogDataSource{


    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-low.log';
    private readonly mediunLogPath  = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor () {
        this.createLogPath();
    }

    private createLogPath() {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogPath,
            this.mediunLogPath,
            this.highLogPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return;
                fs.writeFileSync(path, '');
             
    });
        
    }

    saveLog(log: LogEntity): void {
        const logAsJson = `${JSON.stringify(log)}\n`;
        //appendFileSync es una función que permite escribir en un archivo sin borrar el contenido anterior
        fs.appendFileSync(this.allLogPath, logAsJson);
        if(log.level === LogLevel.low) return;

        if(log.level === LogLevel.medium) {
            fs.appendFileSync(this.mediunLogPath, logAsJson);
            return;
        }else {
            fs.appendFileSync(this.highLogPath, logAsJson);
        }
    }

    private getLogsFromPath(path: string): LogEntity[] {
        
        const logs = fs.readFileSync(path, 'utf-8')
        const stringLogs = logs.split('\n').map(
            log => LogEntity.fromJson(log)
        );
        return stringLogs
        
    }
    async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogLevel.low:
                return this.getLogsFromPath(this.allLogPath)
            case LogLevel.medium:
                return this.getLogsFromPath(this.mediunLogPath)
            case LogLevel.high:
                return this.getLogsFromPath(this.highLogPath)
            default:
                throw new Error(`${severityLevel} Invalid log level`);
        }
    }
  
}