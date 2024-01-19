const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class User {
  constructor(email, phoneNumber, fullName, password, address) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.password = password;
    this.address = address;
  }

  async save() {
    const db = getDb();

    // Check if a user with the same email already exists
    const existingUser = await db.collection('users').findOne({ email: this.email });

    if (existingUser) {
      throw new Error('Email already exists. Please use a different email address.');
    } else {
      // If no user with the same email exists, insert the new user
      return db.collection('users').insertOne(this);
    }
  }

  static async findByEmail(email) {
    const db = getDb();
    return await db.collection('users').findOne({ email });
  }

  static async findById(userId) {
    const db = getDb();
    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
  }

	static async findAll() {
    const db = getDb();
    return await db.collection('users').find({}).toArray();
  }

  static async updateProfile(userId, updatedFields) {
    const db = getDb(); // Assuming you have a getDb function
  
    try {
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) }, // Assuming userId is a string with the user's ID
        { $set: updatedFields }
      );
  
      if (result.matchedCount === 0) {
        throw new Error('User not found.');
      }
  
      return result;
    } catch (error) {
      throw error;
    }
  }
  

  
}

module.exports = User;
