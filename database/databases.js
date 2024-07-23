const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'carbon_calculator';

let db;
let usersCollection;

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        
        // Check if the collection exists and create it if it does not
        const collections = await db.collections();
        const collectionNames = collections.map(col => col.collectionName);
        if (!collectionNames.includes('users')) {
            usersCollection = await db.createCollection('users');
            console.log('Users collection created');
        } else {
            usersCollection = db.collection('users');
            console.log('Users collection already exists');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

// Get the users collection
const getUsersCollection = () => {
    if (!usersCollection) {
        throw new Error('Users collection is not initialized');
    }
    return usersCollection;
};

module.exports = {
    connectToDatabase,
    getUsersCollection,
};
