import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasource/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasource/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/log.repository.impl';
import { CronService } from './cron/cron-service';


const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);


export class Server {

  public static start() {

    console.log( 'Server started...' );

    
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://googlefdgdfg.com';
    //     new CheckService(
    //             mongoLogRepository,
    //              () => console.log( `${ url } is ok` ),
    //              ( error ) => console.log( error ),
    //          ).execute( url );
     
        
    //   }
    // );


  }


}


