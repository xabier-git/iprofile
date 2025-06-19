const connectDB = require('../config/db');
const collectionName = 'profiles';

async function getAllProfiles() {
  console.log('getAllProfiles() called');
  const db = await connectDB();
  console.log('Database connection established', db);
  return db.collection(collectionName).find({}).toArray();
}

async function getProfileByNickname(nickname) {
  const db = await connectDB();
  return db.collection(collectionName).findOne({ nickname });
} 

async function addProfile(profile) {
  const db = await connectDB();
  const result = await db.collection(collectionName).insertOne(profile);
  return db.collection(collectionName).findOne({ _id: result.insertedId });
}

async function updateProfile(nickname, updateData) {
  const db = await connectDB();
  return db.collection(collectionName).findOneAndUpdate(
    { nickname },
    { $set: updateData },
    { returnDocument: 'after' }
  );
}

async function deleteProfile(nickname) {
  const db = await connectDB();
  return db.collection(collectionName).deleteOne({ nickname });
}

module.exports = {
  getAllProfiles,
  getProfileByNickname,
  addProfile,
  updateProfile,
  deleteProfile,
};