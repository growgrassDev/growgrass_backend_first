// Hot to test connection to MongoDB
// ```bash
// bun run src/test-connection.ts
// ```
import mongoose from 'mongoose';

async function testConnection() {
  try {
    await mongoose.connect('mongodb+srv://ba86work:KIEAxuxQLWh6eFW9@cluster0.uk8fj2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected successfully');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();