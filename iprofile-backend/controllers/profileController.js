const Profile = require('../models/profileModel');

exports.list = async (req, res) => {
  try {
    console.log('Obteniendo lista de perfiles...');
    // Llamada al modelo para obtener todos los perfiles
    const profiles = await Profile.getAllProfiles();
    console.log('Perfiles obtenidos:', profiles);
    res.status(200).json(profiles);
    console.log('Respuesta status codigo.', res.statusCode);
  } catch (error) {
    console.error('Error al obtener los perfiles:', error);
    // Manejo de errores, enviando una respuesta adecuada
    res.status(500).json({ error: 'Error al recibir los perfiles.' });
  }
};

exports.add = async (req, res) => {
  try {
    console.log('Agregando perfil...');
    const newProfile = await Profile.addProfile(req.body);
    console.log('Perfil agregado:', newProfile);
    res.status(201).json({ message: 'Perfil agregado exitosamente.', profile: newProfile });
    console.log('Respuesta status codigo.', res.statusCode);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el perfil.' });
  }
};

exports.update = async (req, res) => {
  try {
    console.log('Actualizando perfil con ID:', req.params.id);
    // Llamada al modelo para actualizar el perfil
    const { id } = req.params;
    console.log('parametros recibidos:', req.params);
    if (!id) {
      return res.status(400).json({ error: 'ID de perfil es requerido.' });
    }
    // Validación de los datos del perfil
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Datos del perfil son requeridos.' });
    }
    // Llamada al modelo para actualizar el perfil
    console.log('Datos del perfil a actualizar:', req.body);
    console.log('ID del perfil a actualizar:', id);
    const result = await Profile.updateProfile(id, req.body);
    console.log('Resultado de la actualización:', result);
    if (!result) {
      res.status(404).json({ error: 'Perfil no encontrado.' });
    } else {
      res.status(200).json(result);
    }
     console.log('Respuesta status codigo.', res.statusCode);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('parametros recibidos:', req.params);
    // Llamada al modelo para eliminar el perfil
    console.log('Eliminando perfil con ID:', id);
    if (!id) {
      return res.status(400).json({ error: 'ID de perfil es requerido.' });
    }
    const result = await Profile.deleteProfile(id);
    console.log('Resultado de la eliminación:', result);
    console.log('deletedCount:', result.deletedCount);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Perfil no encontrado.' });
    } else {
      res.status(200).json({ message: 'Perfil eliminado exitosamente.' });
    }
     console.log('Respuesta status codigo.', res.statusCode);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el perfil.' });
  }
};