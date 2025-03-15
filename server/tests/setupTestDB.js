import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

// Connect to the in-memory database before running tests
export const connectDB = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: "testDB" });
  }
};

// Disconnect and clean up after tests
export const disconnectDB = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    mongoServer = null; // Reset
  }
};
