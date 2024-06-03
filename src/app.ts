import { envs } from './config/plugins/envs.plugins';
import { MongoDatabase } from './data/mongo';
import { LogModel } from './data/mongo/models/log.model';
import { Server } from './presentation/server';





(async() => {
  main();
})();


async function main(){

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL, 
    dbName: envs.MONGO_DB_NAME
  })

  /// Crear un coleccion = tables, documentos = registros
  const newLogs = await LogModel.create({
    massage: 'Hello World',
    origin: 'localhost',
    level: 'low'
  })

  await newLogs.save();

   Server.start();

}


