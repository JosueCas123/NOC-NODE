import { LogEntity, LogLevel } from "../entities/log.entity";

// El abstract class LogDataSource es una clase abstracta que define un contrato para las clases que la extienden.
export abstract class LogRepository {

    abstract saveLog( log:LogEntity ): void;
    abstract getLogs(severityLevel: LogLevel): void;
}