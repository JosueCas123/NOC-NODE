
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel,  } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';



export class LogRepositoryImpl implements LogRepository {

  constructor(
    private readonly logDatasource: LogDataSource, //<--- 
  ) {}


  async saveLog( log: LogEntity ): Promise<void> {
    return this.logDatasource.saveLog( log );
  }

  async getLogs( severityLevel: LogLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs( severityLevel );
  }

}