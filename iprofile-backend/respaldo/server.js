const express = require('express');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const basePath = '/iprofile/api/v1';

// Configuración de MongoDB
const mongoUrl = 'mongodb://admin:adminpassword@localhost:27017';
//const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'IGprofileDB';
const collectionName = 'profiles';

// Ruta de bienvenida
app.get(`${basePath}/`, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al servicio IGService' });
});

// Servicio IGProfilesList usando MongoDB
app.get(`${basePath}/list`, async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const profiles = await collection.find({}).toArray();
    console.log('Perfiles obtenidos desde la base de datos:', profiles)
    res.json(profiles);
  } catch (error) {
      console.error('Error al obtener los perfiles:', error);
      res.status(500).json({ error: 'Error al obtener los perfiles desde la base de datos.' });
  } finally {
    if (client) {
      client.close();
    }
  }
});

// Nuevo endpoint PUT para actualizar un perfil por nickname
app.put(`${basePath}/:id`, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(`Actualizando perfil con ID: ${id} con los datos:`, updateData);
  let client;
  try {
    client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Actualiza el perfil por nickname
    const result = await collection.findOneAndUpdate(
      { nickname: id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    console.log('Resultado de la actualización:', result);
    // Si no se encuentra el perfil, devolver un error 404

    if (!result.value) {
      res.status(404).json({ error: 'Perfil no encontrado.' });
    } else {
      res.status(200).json(result.value);
    }
  } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    // Manejo de errores
      res.status(500).json({ error: 'Error al actualizar el perfil.' });
  } finally {
    if (client) {
      client.close();
    }
  }  
});

app.post(`${basePath}/add`, async (req, res) => {
  const newProfile = req.body;
  console.log('Nuevo perfil recibido:', newProfile);
  let client;
  try {
    client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(newProfile);
    console.log('Perfil agregado:', result);

    // Buscar el perfil insertado usando el insertedId
    const insertedProfile = await collection.findOne({ _id: result.insertedId });
    console.log('Perfil insertado:', insertedProfile);
    res.status(201).json({
      message: 'Perfil agregado exitosamente.',
      profile: insertedProfile
    });
  } catch (error) {
      console.error('Error al agregar el perfil:', error);
      res.status(500).json({ error: 'Error al agregar el perfil.' });
  } finally {
    if (client) {
      client.close();
    }
  }
}); 

app.delete(`${basePath}/:id`, async (req, res) => {
  const profileId = req.params.id;
  let client;
  console.log('ID del perfil a eliminar:', profileId);
  try {
    client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ nickname: profileId });
    console.log('Resultado de la eliminación:', result);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Perfil no encontrado.' });
    } else {
      res.status(200).json({ message: 'Perfil eliminado exitosamente.' });
    }
  } catch (error) {
    console.error('Error al eliminar el perfil:', error);
    res.status(500).json({ error: 'Error al eliminar el perfil.' });
  } finally {
    if (client) {
      client.close();
    }
  }
});

// Error handling middleware  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});