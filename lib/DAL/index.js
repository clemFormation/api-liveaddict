//https://github.com/thomasreinecke/graphql-sequelize-pg/blob/master/src/db/index.js
import {DataTypes,Sequelize} from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      schema: process.env.DB_SCHEMA,
      logging: true
  }
)

 await sequelize.authenticate()
console.log(`👍 sequelize ORM connected to ${process.env.DB_DIALECT} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);

// loading all sequelize models from the 'models' folder
import initModels from "./models/init-models.js"
const db = initModels(sequelize);
db.sequelize = sequelize
db.Sequelize = Sequelize

console.log(`👍 models loaded`);

/*
// test de requete
const data = await db.Artiste.findAll()
console.log(`Il y a ${data.length} artiste.`)
*/

export default db;
