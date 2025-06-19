const { MongoClient } = require('mongodb');
console.log("process.env.MONGO_URL:" + process.env.MONGO_URL);
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:adminpassword@localhost:27017';
console.log("mongoUrl:" + mongoUrl);
const dbName = 'iprofiledb';
console.log("dbName:" + dbName);

let client;

async function connectDB() {
  try {
    if (!client) {
      client = await MongoClient.connect(mongoUrl);
      console.log('Conexión a MongoDB exitosa',client);
    }
    return client.db(dbName);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos MongoDB', error);
  }
}

module.exports = connectDB;